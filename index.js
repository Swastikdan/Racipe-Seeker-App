require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
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