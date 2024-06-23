
var express = require('express');
var mongoclient=require("mongodb").MongoClient;
var core = require("cores");
var multer = require("multer");

//get express instance
 var app = express();

app.use(core());

var Connection_string ="mongodb+srv://sandaluthushan20:<password>@ransom.wxp1ukq.mongodb.net/?retryWrites=true&w=majority&appName=Ransom"

