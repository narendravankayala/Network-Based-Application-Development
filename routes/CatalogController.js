var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');

router.get('/',  function(req, res) {
  res.render('index');
});

router.get('/categories/catalog', function(req, res) {
    var categories = getCategories();
    var itemData = itemDb.getItems();
    var data= {
        categories: categories,
        items: itemData
    }
    res.render('categories', { data: data });
});

router.get('/contact', function(req, res) {
    res.render('contact');
});

router.get('/about', function(req, res) {
    res.render('about');
});

router.get('/categories/item/:itemCode', function(req, res) {

    var itemCode = req.params.itemCode;
    console.log("Item Code:"+itemCode);
    var item = itemDb.getItem(itemCode);
    if(item == null){
      res.redirect('/categories/catalog');
    }

    else{
      var data= {item: item}
      res.render('item', { data: data});
    }
    console.log(item);

});

router.get('/myitems', function(req, res) {
    res.render('myitems');
});


router.get('/feedback', function(req, res) {
    res.render('feedback');
});


var categories = [];
let getCategories = function() {
    var data = itemDb.getItems();
    data.forEach(function (item) {
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
      });
    return categories;
};

// If the itemCode is not there I am redirecting to catalog route
router.get('/*', function(req, res) {
    res.redirect('/categories/catalog');
});

module.exports = router;
