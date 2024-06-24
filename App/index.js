
var express = require('express');
var mongoclient =require("mongodb").MongoClient;
var core = require("cores");
var multer = require("multer");

//get express instance
 var app = express();

app.use(core());

var Connection_string ="mongodb+srv://sandaluthushan20:Mk67DS0NNLabb8ZI@cluster0.9qwykfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

var DATABASENAME ="APIDB";
var database;


app.listen(5038,()=>{
    mongoclient.connect(Connection_string,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("connected to database");
    })
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