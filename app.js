var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use('/assets/css', express.static(__dirname + '/assets/css'));
app.use('/assets/images',express.static(__dirname + '/assets/images'))

var catalogController = require('./routes/CatalogController.js');

app.use('/', catalogController);

app.listen(8080,function(){
    console.log('App started')
    console.log('listening on port 8080')
});

module.exports = app;
