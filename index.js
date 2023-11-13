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

// Check if MongoDB URI is available
if (!uri) {
  console.error('Error: MongoDB URI not found in environment variables. Please check your configuration.');
  process.exit(1); // Exit the process with an error code
}

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
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('Racepies').collection('Raw_Racepies');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};

// Serve index.html file at root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve recipe-details.html file at /recipe-details.html URL
app.get('/recipe-details.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'recipe-details.html'));
});

// Redirect /recipe-details URL to /recipe-details.html URL
app.get('/recipe-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'recipe-details.html'));
});

// Serve recipes matching search and ingredient queries at /api/recipes URL
app.get('/api/recipes', async (req, res, next) => {
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
    next(error);
  }
});

// Serve recipe with specified ID at /api/recipes/:id URL
app.get('/api/recipes/:id', async (req, res, next) => {
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
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Serve 404 error page for all other URLs
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start server listening on specified port
const startServer = async () => {
  try {
    await connectDB(); // Ensure database connection is established before starting the server
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Handle server shutdown gracefully
    process.on('SIGTERM', async () => {
      server.close(async () => {
        console.log('Server closed');
        // Close MongoDB connection when the server is closed
        await client.close();
        console.log('MongoDB connection closed');
      });
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
