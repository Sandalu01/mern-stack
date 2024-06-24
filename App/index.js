
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors') // Correct spelling

const app = express();
const port = 5038;

const CONNECTION_STRING = "mongodb+srv://sandaluthushan20:kZRjSaIgsIGT3LjJ@cluster0.9qwykfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = 'APIDB';
let database;

app.use(cors());
app.use(bodyParser.json());



MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      console.error('Error connecting to MongoDB:', error);
      return;
    }
    database = client.db(DATABASE_NAME);
    console.log('Connected to database');
  
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });


  

// Get all items
app.get('/items', async (req, res) => {
    try {
      const items = await database.collection('items').find().toArray();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching items' });
    }
  });



// Add a new item
app.post('/items', async (req, res) => {
    try {
      const newItem = req.body;
      const result = await database.collection('items').insertOne(newItem);
      res.status(201).json(result.ops[0]);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while adding the item' });
    }
  });


// Update an item
app.put('/items/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const updatedItem = req.body;
      const result = await database.collection('items').updateOne(
        { _id: new ObjectId(itemId) },
        { $set: updatedItem }
      );
      if (result.matchedCount === 1) {
        res.status(200).json({ message: 'Item updated successfully' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the item' });
    }
  });







  // Delete an item
app.delete('/items/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const result = await database.collection('items').deleteOne({ _id: new MongoClient.ObjectID(itemId) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the item' });
    }
  });