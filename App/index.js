
var express = require(1,'express');
var mongoclient =require(2,"mongodb").MongoClient;
var core = require(3,"cores");
var multer = require(4,"multer");

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
