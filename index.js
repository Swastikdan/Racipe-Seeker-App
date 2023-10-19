const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
app.use(cors());
app.use(compression());
let dbClient;
const connectDB = async () => {
  if (!dbClient) {
    dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await dbClient.connect();
  }
  return dbClient;
};
const authenticateLogs = async (username, password, callback) => {
  const expectedUsername = process.env.LOG_USERNAME;
  const expectedPassword = process.env.LOG_PASSWORD;

  if (username === expectedUsername && password === expectedPassword) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api/recipes')) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const timestamp = new Date().toISOString();
    const requestLogMessage = `${timestamp} - IP: ${ip}, Method: ${req.method}, Path: ${req.path}, Query: ${JSON.stringify(req.query)}`;
    const responseLogMessage = `${timestamp} - Response: ${res.statusCode >= 400 ? 'error' : 'ok'}`;

    try {
      const client = await connectDB();
      const database = client.db('Racepies');
      const collection = database.collection('Logs');

      const logDocument = {
        request: requestLogMessage,
        response: responseLogMessage
      };

      await collection.insertOne(logDocument);
    } catch (err) {
      console.error('Error writing log to database:', err);
    }

    next();
  } else {
    next();
  }
});
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/recipe-details.html', (req, res) => {
  res.sendFile(__dirname + '/recipe-details.html');
});
app.get('/recipe-details', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'recipe-details.html'));
});
app.get('/api/recipes', async (req, res) => {
  try {
    const client = await connectDB();

    const database = client.db('Racepies');
    const collection = database.collection('Raw_Racepies');

    let pipeline = [];

    if (req.query.search) {
      pipeline.push({
        $search: {
          index: 'default',
          text: {
            query: req.query.search,
            path: {
              wildcard: '*'
            }
          }
        }
      });
    }

    if (req.query.ingredient) {
      pipeline.push({
        $search: {
          index: 'default',
          autocomplete: {
            query: req.query.ingredient,
            path: 'ingredients',
            fuzzy: {
              maxEdits: 1
            }
          }
        }
      });
    }
    pipeline.push(
      { $sort: { score: -1 } },
      { $limit: 100 }
    );
    const recipes = await collection.aggregate(pipeline).toArray();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const client = await connectDB();
    const database = client.db('Racepies');
    const collection = database.collection('Raw_Racepies');
    const recipeId = req.params.id;
    const query = { _id: new ObjectId(recipeId) };
    const recipe = await collection.findOne(query);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/logs', basicAuth({
  authorizeAsync: true,
  authorizer: authenticateLogs,
  challenge: true,
  unauthorizedResponse: 'Unauthorized'
}), async (req, res) => {
  try {
    const client = await connectDB();
    const database = client.db('Racepies');
    const collection = database.collection('Logs');
    
    const logs = await collection.find().toArray();
    
    let logsText = '';
    logs.forEach(log => {
      logsText += log.request + '\n' + log.response + '\n\n';
    });
    
    res.setHeader('Content-Type', 'text/plain');
    res.send(logsText);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).send('Internal server error');
  }
});
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/404.html'));
});
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).sendFile(path.join(__dirname, '/500.html'));
  next(err);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});