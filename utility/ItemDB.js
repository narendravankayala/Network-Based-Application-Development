var Item = require('../model/Item');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/internship')
var Schema = mongoose.Schema;
var itemSchema = new Schema({
  itemCode : String,
  itemName : String,
  catalogCategory: String,
  description: String,
  rating: String,
  imageURL:String
}, {collection: 'itemDb'});
var itemData = mongoose.model('itemDb', itemSchema);
module.exports.getItems = function () {
  return new Promise(resolve =>{
    resolve(itemData.find().then(function (it) {
        let items = [];
        for (let i =  0 ; i < it.length; i++){
          let item = new Item(it[i].itemCode,
            it[i].itemName,
            it[i].catalogCategory,
            it[i].description,
            it[i].rating
          );
          item.imageURL = item.getImageURL(it[i].itemCode);
          items.push(item)
        }
        return items;
    })
  );
});

    // let items = [];
    // for (let i = 0;   i < itemDetails.length; i++) {
    //     let item = new Item(itemDetails[i].itemCode,
    //         itemDetails[i].itemName,
    //         itemDetails[i].catalogCategory,
    //         itemDetails[i].description,
    //         itemDetails[i].rating,
    //         );
    //         item.imageURL  = item.getImageURL(itemDetails[i].itemCode);
    //     items.push(item);
    //   }
    // return items;
};

module.exports.getItem = function (itemCode) {
  return new Promise(resolve =>{
    resolve(itemData.find({itemCode:itemCode}).then(function (it) {
      let item = new Item();
      if (it.length > 0) {
      it[0].imageURL = item.getImageURL(it[0].itemCode);
      }

      return it[0]
    })
  );
  });
    // console.info("from DB, Item code :" + itemCode)
    // for (var i = 0; i < itemDetails.length; i++) {
    //           console.log("Data" + JSON.stringify(itemDetails[i].imgUrl));
    //     if (parseInt(itemDetails[i].itemCode) == itemCode) {
    //         let item = new Item(itemDetails[i].itemCode,
    //             itemDetails[i].itemName,
    //             itemDetails[i].catalogCategory,
    //             itemDetails[i].description,
    //             itemDetails[i].rating,
    //             // itemDetails[i].imageURL;
    //             );
    //           item.imageURL =   item.getImageURL(itemDetails[i].itemCode);
    //         console.log("Item"+JSON.stringify(item));
    //
    //         return item;
    //     }
    //
    // }
};

// var itemDetails = [
//     {
//         itemCode: 1,
//         itemName: "Microsoft",
//         catalogCategory: "Computer Science",
//         description: "This is microsoft internship",
//         rating: 5,
//         imageURL: "",
//     },
//     {
//         itemCode: 2,
//         itemName: "Facebook",
//         catalogCategory: "Computer Science",
//         description: "This is Facebook Internship",
//         rating: 4,
//         imageURL: "",
//     },
//     {
//         itemCode: 3,
//         itemName: "Google",
//         catalogCategory: "Computer Science",
//         description: "This is Google Internship",
//         rating: 3.5,
//         imageURL: "",
//     },
//     {
//         itemCode: 4,
//         itemName: "Reliance",
//         catalogCategory: "Construction Engineering",
//         description: "This is Reliance internship",
//         rating: 3.5,
//         imageURL: "",
//     },
//     {
//         itemCode: 5,
//         itemName: "Hindalco",
//         catalogCategory: "Construction Engineering",
//         description: "This is hindalco internship",
//         rating: 4.5,
//         imageURL: "",
//     },
//     {
//         itemCode: 6,
//         itemName: "Vankayala Constructions",
//         catalogCategory: "Construction Engineering",
//         description: "This is family business",
//         rating: 4,
//         imageURL: "",
//     }
// ];

module.exports.category = ["Computer Science", "Construction Engineering"];
