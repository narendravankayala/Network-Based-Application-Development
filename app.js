var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use('/assets/css', express.static(__dirname + '/assets/css'));
app.use('/assets/images',express.static(__dirname + '/assets/images'))
var session = require('express-session');
var catalogController = require('./routes/CatalogController.js');


app.use(session({
  secret : 'narendra',
  resave : false,
  saveUninitialized : true
}))
app.use('/', catalogController);

app.listen(8000,function(){
    console.log('App started')
    console.log('listening on port 8000')
});

module.exports = app;
