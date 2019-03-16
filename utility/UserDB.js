var User = require('../model/User');
var UserItem = require('../model/UserItem');
var UserProfile = require('../model/UserProfile');

var usersData = [
            {

              userId : 1,
              firstName : 'Narendra',
              lastName : 'Vankayala',
              emailAddress : 'admin1@gmail.com',
              password : 'admin1',
              address1 : 'barton',
              address2 : 'apt m',
              city : 'charlotte',
              state : 'NC',
              postalCode : '28262',
              country : 'USA'
            },
            {

              userId : 2,
              firstName : 'Lipsa',
              lastName : 'Rani',
              emailAddress : 'admin2@gmail.com',
              password : 'admin2',
              address1 : 'bangalore',
              address2 : '12345',
              city : 'bangalore',
              state : 'Karnataka',
              postalCode : '52213',
              country : 'India'
            }
]
module.exports.getUsers = function () {
    let users = [];
    for(let i = 0 ; i < usersData.length ; i++){
      let user = new User(usersData[i].userId, usersData[i].firstName, usersData[i].lastName,
                          usersData[i].emailAddress, usersData[i].password, usersData[i].address1,
                          usersData[i].address2, usersData[i].city, usersData[i].state, usersData[i].postalCode, usersData[i].country)
      users.push(user);
    }
    return users;
  }

var usersProfileData = [


  {
    userId : 1,
    userItems : [
      {
        itemCode : '1',
        itemName : 'Microsoft',
        categoryName : 'Computer Science',
        rating : 4,
        madeIt : 1
      },
      {
        itemCode : '2',
        itemName : 'Facebook',
        categoryName : 'Computer Science',
        rating : 5,
        madeIt : 0
      }
    ]
  }
]

module.exports.getUsersProfile = function () {

    let usersProfile = [];
    let userItems = [];
    for (let i = 0 ; i < usersProfileData.length; i++){
      let userProfile = new UserProfile(usersProfileData[i].userId);
      for(let j = 0 ; j < usersProfileData[i].userItems.length; j++){
        let userItem = new UserItem(usersProfileData[i].userItems[j].itemCode,usersProfileData[i].userItems[j].itemName,usersProfileData[i].userItems[j].categoryName, usersProfileData[i].userItems[j].rating, usersProfileData[i].userItems[j].madeIt )
        userItems.push(userItem);
      }
      userProfile.userItems = userItems;
      usersProfile.push(userProfile);
  }
  return usersProfile;
}
// var allItems = itemDb.getItems();
//
// var user1 = new User('1', 'Narendra','Vankayala','nvankay1@uncc.edu','barton','creek','charlotte','NC','28262','USA');
// var user2 = new User('2', 'Lipsa', 'Rani', 'lip@gmail.com', 'baarton', 'creek', 'charlotte', 'NC', '28222', 'India');
// var userItem1 = new UserItem(allItems[0],'4', 'true');
// var userItem2 = new UserItem(allItems[2],'3', 'false');
// var userItem3 = new UserItem(allItems[4],'5', 'true');
//
//
// var userProfile1= new UserProfile(user1.userId, [userItem1, userItem2]);
// var userProfile2 = new UserProfile(user2.userId, [useritem1, userItem3, userItem2]);
//
//
// var allUsers = [user1, user2];
// var allUserItems = [useritem1, userItem2, userItem3];
// var allUserProfiles = [userProfile1, userProfile2];
//
// module.exports.getUsers = function () {
//   return allUsers;
// }
// module.exports.getUserProfile = function (userId) {


// }
// var
//
//
// module.exports = userProfile1;
