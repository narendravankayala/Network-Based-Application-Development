var User = require('../model/User');
var UserItem = require('../model/UserItem');
var UserProfile = require('../model/UserProfile');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/internship');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
    userId : String,
    firstName : String,
    lastName : String,
    emailAddress : String,
    password : String,
    address1 : String,
    address2 : String,
    city : String,
    state : String,
    postalCode : String,
    country : String,
}, {collection : 'users'});

var userData = mongoose.model('users', usersSchema);
var usersProfileSchema = new Schema({
  userId : String,
  itemCode : String,
  itemName : String,
  categoryName : String,
  rating : String,
  madeIt : String
}, {collection : 'userProfile'});
var userProfileData = mongoose.model('userProfile', usersProfileSchema);
module.exports.getAllUsers = function () {
  return new Promise(resolve => {
    resolve(userData.find().then(function(allusrs){
      return allusrs;
    }));
  });
    // let users = [];
    // for(let i = 0 ; i < usersData.length ; i++){
    //   let user = new User(usersData[i].userId, usersData[i].firstName, usersData[i].lastName,
    //                       usersData[i].emailAddress, usersData[i].password, usersData[i].address1,
    //                       usersData[i].address2, usersData[i].city, usersData[i].state, usersData[i].postalCode, usersData[i].country)
    //   users.push(user);
    // }
    // return users;
  }

module.exports.getUser = function (Id) {
  return new Promise(resolve =>{
    resolve(userData.find({userId : Id}).then(function(usr) {
      return usr;
    }));
  });
}

module.exports.getUsersProfile = function (Id) {
  return new Promise(resolve =>{
    resolve(userProfileData.find({userId: Id}).then(function(usrprfl){
      return usrprfl;
    }));
  })
}
// module.exports.getUserProfile = function (Id) {
//   return new Promise(resolve =>{
//     resolve(userProfileData.find({userId : Id}).then(function (d) {
//       return d;
//     }));
//   });
// }

module.exports.addItem = function (item, user) {
  return new Promise(resolve =>{
    resolve(userProfileData.find({userId : user.userId, itemCode:item.itemCode}, function (err, d) {
      if (d.length === 0){
        var itm = {
          userId : user.userId,
          itemCode : item.itemCode,
          itemName : item.itemName,
          categoryName : item.catalogCategory,
          rating : item.rating,
          madeIt : "0"
        }
        var data = new userProfileData(itm)
        data.save()
        return "addedItem"
      }
  })
)
  })
}



module.exports.deleteItem = function (code, id) {
  return new Promise(resolve =>{
    resolve(userProfileData.findOneAndDelete({userId : id.userId, itemCode: code}).exec(function(err) {
          return "deleted";
    }))
  })
}

module.exports.updateFlag = function (code, id, madeIt) {
  return new Promise(resolve =>{
    resolve(userProfileData.findOneAndUpdate({userId : id.userId, itemCode : code}, {madeIt : madeIt}).exec(function (err) {
      return "updatedFalg";
    }))
  })
}

module.exports.updateRating = function (code, id , rating) {
  return new Promise(resolve =>{
    resolve( userProfileData.findOneAndUpdate({userId : id.userId, itemCode: code}, {rating : rating}).exec(function (err) {
        return "updatedRating"
    }))
  })
}
