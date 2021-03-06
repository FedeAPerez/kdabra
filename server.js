// server.js
const express        	= require('express');
const MongoClient    	= require('mongodb').MongoClient;
const bodyParser     	= require('body-parser');
const db             	= require('./config/db');
const app            	= express();
const expressValidator  = require('express-validator');

const port 				= 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator()); 


MongoClient.connect(db.url, (err, database) => {
  if (err) 
  	return console.log(err)

  require('./app/routes')(app, database);

  app.listen((process.env.PORT || 5000), () => {
  	
    console.log('Se está ejecutando en el puerto: ' + port);
  });     
          
  
})