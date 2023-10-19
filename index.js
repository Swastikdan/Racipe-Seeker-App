// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

// Create Express app
const app = express();

// Set port number from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Set MongoDB URI from environment variable
const uri = process.env.MONGODB_URI;

// Enable CORS and compression middleware
app.use(cors());
app.use(compression());

// Enable JSON request body parsing middleware
app.use(express.json());

// Serve static files from /src and /public directories
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB database and return Raw_Racepies collection
const connectDB = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db('Racepies').collection('Raw_Racepies');
};

// Serve index.html file at root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Serve index.html file at /index.html URL
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve recipe-details.html file at /recipe-details.html URL
app.get('/recipe-details.html', (req, res) => {
  res.sendFile(__dirname + '/recipe-details.html');
});

// Redirect /recipe-details URL to /recipe-details.html URL
app.get('/recipe-details', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'recipe-details.html'));
});

// Serve recipes matching search and ingredient queries at /api/recipes URL
app.get('/api/recipes', async (req, res) => {
  try {
    const collection = await connectDB();

    const pipeline = [];

    // Add $search stage to pipeline if search query is present
    if (req.query.search) {
      pipeline.push({
        $search: {
          index: 'default',
          text: {
            query: req.query.search,
            path: { wildcard: '*' }
          }
        }
      });
    }

    // Add $search stage to pipeline if ingredient query is present
    if (req.query.ingredient) {
      pipeline.push({
        $search: {
          index: 'default',
          autocomplete: {
            query: req.query.ingredient,
            path: 'ingredients',
            fuzzy: { maxEdits: 1 }
          }
        }
      });
    }

    // Add $sort and $limit stages to pipeline
    pipeline.push({ $sort: { score: -1 } }, { $limit: 100 });

    // Execute pipeline and return resulting recipes
    const recipes = await collection.aggregate(pipeline).toArray();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve recipe with specified ID at /api/recipes/:id URL
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const collection = await connectDB();
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

// Serve 404 error page for all other URLs
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/404.html'));
});

// Serve 500 error page for unhandled errors
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).sendFile(path.join(__dirname, '/500.html'));
});

// Start server listening on specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});