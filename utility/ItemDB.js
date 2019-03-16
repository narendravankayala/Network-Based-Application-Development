var Item = require('../model/Item');
module.exports.getItems = function () {

    let items = [];
    for (let i = 0;   i < itemDetails.length; i++) {
        let item = new Item(itemDetails[i].itemCode,
            itemDetails[i].itemName,
            itemDetails[i].catalogCategory,
            itemDetails[i].description,
            itemDetails[i].rating,
            );
            item.imageURL  = item.getImageURL(itemDetails[i].itemCode);
        items.push(item);
      }
    return items;
};

module.exports.getItem = function (itemCode) {
    console.info("from DB, Item code :" + itemCode)
    for (var i = 0; i < itemDetails.length; i++) {
              console.log("Data" + JSON.stringify(itemDetails[i].imgUrl));
        if (parseInt(itemDetails[i].itemCode) == itemCode) {
            let item = new Item(itemDetails[i].itemCode,
                itemDetails[i].itemName,
                itemDetails[i].catalogCategory,
                itemDetails[i].description,
                itemDetails[i].rating,
                // itemDetails[i].imageURL;
                );
              item.imageURL =   item.getImageURL(itemDetails[i].itemCode);
            console.log("Item"+JSON.stringify(item));

            return item;
        }

    }
};

var itemDetails = [
    {
        itemCode: 1,
        itemName: "Microsoft",
        catalogCategory: "Computer Science",
        description: "This is microsoft internship",
        rating: 5,
        imageURL: "",
    },
    {
        itemCode: 2,
        itemName: "Facebook",
        catalogCategory: "Computer Science",
        description: "This is Facebook Internship",
        rating: 4,
        imageURL: "",
    },
    {
        itemCode: 3,
        itemName: "Google",
        catalogCategory: "Computer Science",
        description: "This is Google Internship",
        rating: 3.5,
        imageURL: "",
    },
    {
        itemCode: 4,
        itemName: "Reliance",
        catalogCategory: "Construction Engineering",
        description: "This is Reliance internship",
        rating: 3.5,
        imageURL: "",
    },
    {
        itemCode: 5,
        itemName: "Hindalco",
        catalogCategory: "Construction Engineering",
        description: "This is hindalco internship",
        rating: 4.5,
        imageURL: "",
    },
    {
        itemCode: 6,
        itemName: "Vankayala Constructions",
        catalogCategory: "Construction Engineering",
        description: "This is family business",
        rating: 4,
        imageURL: "",
    }
];

module.exports.category = ["Computer Science", "Construction Engineering"];
