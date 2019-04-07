var UserItem = require('./UserItem');
var Item = require('./Item');

class UserProfile {
  constructor(userId ) {
    this.userId = userId;
    this.userItems = [];
  }

  getItems(){
    return this.userItems;
  }

  emptyProfile(){
    this.userItems = [];
  }

  removeItem(item){
    index = -1 ;
    for(i = 0 ; i < this.userItems.length; i++){
      if(this.userItems[i].itemCode == item.itemCode){
        index = i
      }
    }
    if(index != -1){
        this.userItems.splice(index, 1);
    }
    else{
      console.log("Index is still -1 which item doesnot exists");
    }
}

  addItem(itemCode, itemName, categoryName, rating, madeIt){
    var userItem = new UserItem(itemCode, itemName, categoryName, rating, madeIt);
    // isPresent = 0;
    // for(i = 0 ; i < this.userItems.length; i++){
    //   if(this.userItem[i].itemCode == userItem.itemCode)
    //           isPresent = 1
    // }
    // if(!isPresent){
    //   this.userItems.push(userItem);
    // }
    // else {
    //   console.log("Item is already present or itemcode doesnot exists");
    // }
    this.userItems.push(userItem);
  }

  updateItem(userItem){
    for(i = 0 ; i < this.userItems.length; i++){
      if(this.userItems[i].itemCode == userItem.itemCode)
                this.userItems[i].rating = userItem.rating;
                this.userItems[i].madeIt = userItem.madeIt;
              }
            }
          }

  module.exports = UserProfile;
