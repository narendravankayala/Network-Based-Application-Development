var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');
var userDb = require('../utility/UserDB');
var session = require('express-session');
// var users = userDb.getUsers();
// var userProfile = userDb.getUsersProfile();
var UserItem = require('../model/UserItem');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({
  extended : false
});


router.get('/',  function(req, res) {
  if(req.session.theUser){
    res.render('index',{userProfile : req.session.userProfile});
  }
  else{
    res.render('index', {userProfile : null});
  }
});


router.post('/login', urlEncodedParser, function (req, res) {
    var emailAddress = req.body.emailAddress;
    var password = req.body.password;
    var isValid = 0 ;
    userDb.getAllUsers().then(function(users){
      for(let i = 0 ; i < users.length; i++){
        if(users[i].emailAddress == emailAddress && users[i].password == password){
          req.session.theUser = users[i].userId;
          userDb.getUsersProfile(req.session.theUser).then(function(userProfile){
            req.session.userProfile = userProfile
            res.render('myitems', {userProfile : req.session.userProfile})

    });


        // for(let j = 0 ; j < userProfile.length; j++){
          // if(userProfile[j].userId = req.session.theUser){
            // req.session.userProfile = userProfile[j];
            // isValid = 1;
          }
        }
        // res.render('myitems', {userProfile : req.session.userProfile});
      // }
    // }
    // if(!isValid){
    //   res.render('login', {userProfile : null});
    // }
});
});


router.get('/login', function (req, res) {
    res.render('login',{userProfile : null});
});

router.get('/logout', function (req, res) {
  req.session.destroy();
  // users = userDb.getUsers();
  // userProfile = userDb.getUsersProfile();
  res.render('index', {userProfile : null});
});




router.get('/categories/catalog', function(req, res) {
    var category = itemDb.category;
    // var itemData = itemDb.getItems();
    itemDb.getItems().then(function(itemData){
      if(req.session.theUser){
        res.render('categories', {itemData :itemData, category : category, userProfile : req.session.userProfile });
      }
      else {
        res.render('categories', {itemData : itemData, category : category, userProfile : null});
      }
    })

    // var data= {
    //     categories: categories,
    //     items: itemData
    // }
    // res.render('categories', { data: data });
});

router.get('/contact', function(req, res) {
  if(req.session.theUser){
    res.render('contact', {userProfile : req.session.userProfile});
  }
  else {
    res.render('contact', {userProfile : null});
  }

});

router.get('/about', function(req, res) {
  if(req.session.theUser){
    res.render('about', {userProfile : req.session.userProfile})
  }else {
    res.render('about', {userProfile : null});
  }
    // res.render('about');
});


router.get('/categories/item/:itemCode', function(req, res) {

    var itemCode = req.params.itemCode;
    console.log("Item Code:"+itemCode);
    // var item = itemDb.getItem(itemCode);
    // var itemData = itemDb.getItems();
    var category = itemDb.category;
    itemDb.getItems().then(function(itemData){
      itemDb.getItem(itemCode).then(function(item){
        if(req.session.theUser){
          if(item === undefined){
            res.render('categories', {itemData : itemData, category : category, userProfile : req.session.userProfile});
          }
          else {
            res.render('item', { item : item, userProfile : req.session.userProfile});
          }
        }
        else {
          if(item === undefined ){
              res.render('categories', {itemData : itemData, category : category, userProfile : null});
          }
          else {
            res.render('item',{item: item, userProfile : null});
          }
        }

      })
    })

    // }
    // if(item == null){
    //   res.redirect('/categories/catalog');
    // }
    //
    // else{
    //   var data= {item: item}
    //   res.render('item', { data: data});
    // console.log(item);
});

router.get('/myitems', function(req, res) {
  if(req.session.theUser){
    res.render('myitems', {userProfile : req.session.userProfile});
  }
  else {
    userDb.getAllUsers().then(function(users){
      req.session.theUser = users[0];
        userDb.getUsersProfile(req.session.theUser.userId).then(function(userProfile){
        req.session.userProfile = userProfile
        res.render('myitems', {userProfile: req.session.userProfile});
      })
      // for(let i = 0 ; i < userProfile.length; i++ ){
        // if(userProfile[i].userId = req.session.theUser.userId){
          // req.session.userProfile = userProfile[i];
        // }


      // res.render('myitems', {userProfile : null});


    })
  }

    // res.render('myitems');
});

router.get('/myitems/save', function(req, res) {
    var code = req.query.itemCode;
    var flag =1;
    if(req.session.theUser){
    // for(let i=0; i<req.session.userProfile.userItems.length; i++){
    //   if(req.session.userProfile.userItems[i].itemCode == code){
    //         flag=0;
    //    }
    // }
    itemDb.getItem(code).then(function(item) {
      if (item) {
        userDb.addItem(item, req.session.theUser).then(function(){
          userDb.getUsersProfile(req.session.theUser.userId).then(function(userProfile){
            req.session.userProfile = userProfile
            res.render('myitems', {userProfile : req.session.userProfile})
          })
        })

      }

    });
  }
    else {
      userDb.getAllUsers().then(function(users) {
        req.session.theUser = users[0];
        itemDb.getItem(code).then(function(item){
          if (item) {
            userDb.addItem(item, req.session.theUser)
            userDb.getUsersProfile(req.session.theUser.userId).then(function(userProfile) {
                req.session.userProfile = userProfile
                res.render('myitems',{userProfile:req.session.userProfile});
            })
          }
        })
      })
    }
    // if(flag == 1){
    //   var newUserProfile = [];
    //   var itemdata = itemDb.getItem(code);
    //   if(itemdata){
    //     var newUserItem = new UserItem(itemdata.itemCode,itemdata.itemName,itemdata.catalogCategory, 0, 0);
    //       newUserProfile = req.session.userProfile;
    //       newUserProfile.userItems.push(newUserItem);
    //       req.session.userProfile = newUserProfile;
    //     }
    // }
    // res.render('myitems',{userProfile:req.session.userProfile});

  // else {
  //   req.session.theUser = users[0];
  //   for(let i=0;i<userProfile.length;i++){
  //     if(userProfile[i].userId == req.session.theUser.userId){
  //         req.session.userProfile = userProfile[i];
  //     }
  //   }
  //   res.render('myitems',{userProfile:req.session.userProfile});
  // }
});


router.get('/myitems/delete', function(req, res) {
      var code = req.query.itemCode
      if(req.session.theUser){
        userDb.deleteItem(code, req.session.theUser).then(function(a){
          userDb.getUsersProfile(req.session.theUser.userId).then(function(userProfile){
            req.session.userProfile = userProfile
              res.render('myitems',{userProfile:req.session.userProfile});
          })
        })
      }
      else {
        userDb.getAllUsers().then(function(users){
          req.session.theUser = users[0]
          userDb.getUsersProfile(req.session.theUser.userId).then(function (userProfile) {
            req.session.userProfile = userProfile
            res.render('myitems',{userProfile:req.session.userProfile});

          })
        })
      }
      // var newUserProfile = req.session.userProfile
      // for(let i=0;i<newUserProfile.userItems.length;i++){
      //     if(newUserProfile.userItems[i].itemCode == req.query.itemCode){
      //           newUserProfile.userItems.splice(i,1);
      //     }
      // }
      // req.session.userProfile = newUserProfile;
      // res.render('myitems',{userProfile:req.session.userProfile});
});


router.get('/myitems/feedback', function(req, res) {
  var code = req.query.itemCode;
  if(req.session.theUser){
      // var item = itemDb.getItem(code);
      itemDb.getItem(code).then(function(item){
        if(item){
          res.render('feedback',{item:item, userProfile:req.session.userProfile});
        }
        else {
          res.render('myitems',{userProfile:req.session.userProfile});
        }
      })

  }
  else {
    userDb.getAllUsers().then(function(users){
      req.session.theUser = users[0];
      userDb.getUsersProfile(req.session.theUser.userId).then(function (userProfile) {
        req.session.theUser = userProfile
        res.render('myitems',{userProfile:req.session.userProfile});


      })
    })
//       req.session.theUser = users[0];
//       for(let i=0;i<userProfile.length;i++){
//         if(userprofile[i].userId == req.session.theUser.userId){
//             req.session.userProfile = userProfile[i];
//         }
//       }
//       res.render('myitems',{userProfile:req.session.userProfile});
}
});

router.get('/myitems/updateRating', function(req, res) {
    var rating = req.query.rating;
    var code= req.query.itemCode;
    if(req.session.theUser){
        if(rating >= 0 && rating <= 5 && rating != undefined){
            userDb.updateRating(code, req.session.theUser, rating).then(function(err){
              userDb.getUsersProfile(req.session.theUser.userId).then(function (userProfile) {
                req.session.userProfile =userProfile
                res.render('myitems',{userProfile:req.session.userProfile});

              })
            })
          }
          else {
            res.render('myitems',{userProfile:req.session.userProfile});
          }
        }
        else {
          userDb.getAllUsers().then(function (users) {
            req.session.theUser = users[0]
            userDb.getUsersProfile(req.session.theUser.userId).then(function (userProfile) {
              req.session.userProfile = userProfile
              res.render('myitems',{userProfile:req.session.userProfile});

            })

          })
        }
            // var newUserProfile = req.session.userProfile;

            // for(let i=0; i<newUserProfile.userItems.length; i++){
                // if(code == newUserProfile.userItems[i].itemCode){
                // }
                // newUserProfile.userItems[i].rating = rating;
              // }
    //     req.session.userProfile = newUserProfile;
    //     res.render('myitems',{userProfile:req.session.userProfile});
    //     }
    //     else {
    //       res.render('myitems',{userProfile:req.session.userProfile});
    //     }
    // }
    // else {
    //   req.session.theUser = users[0];
    //   for(let i=0;i<userProfile.length;i++){
    //     if(userProfile[i].userId == req.session.theUser.userId){
    //         req.session.userProfile = userProfile[i];
    //     }
    //   }
    //   res.render('myitems',{userProfile:req.session.userProfile});
    // }
    //
});

router.get('/myitems/updateFlag', function(req, res) {
  var madeIt = req.query.madeIt;
  var code= req.query.itemCode;
  if(req.session.theUser){
      if(madeIt >= 0 && madeIt <= 1 && madeIt != undefined){
          userDb.updateFlag(code, req.session.theUser, madeIt).then(function (err) {
            userDb.getUsersProfile(req.session.theUser.userId).then(function (userProfile) {
              req.session.userProfile = userProfile
              // req.session.madeIt = madeIt
              res.render('myitems',{userProfile:req.session.userProfile});

            })
          })
        }
        else {
          res.render('myitems',{userProfile:req.session.userProfile});

        }
      }

      else {
        userDb.getAllUsers().then(function (users) {
          req.session.theUser = users[0]
          userDb.getUsersProfile(req.session.theUser.userId).then(function (userProfile) {
            req.session.userProfile = userProfile
            res.render('myitems',{userProfile:req.session.userProfile});

          })

        })
      }
  //         var newUserProfile = req.session.userProfile;
  //
  //         for(let i=0; i<newUserProfile.userItems.length; i++){
  //             if(code == newUserProfile.userItems[i].itemCode){
  //                 newUserProfile.userItems[i].madeIt = madeIt;
  //             }
  //           }
  //     req.session.userProfile = newUserProfile;
  //     res.render('myitems',{userProfile:req.session.userProfile});
  //     }
  //     else {
  //       res.render('myitems',{userProfile:req.session.userProfile});
  //     }
  // }
  // else {
  //   req.session.theUser = users[0];
  //   for(let i=0;i<userProfile.length;i++){
  //     if(userProfile[i].userId == req.session.theUser.userId){
  //         req.session.userProfile = userProfile[i];
  //     }
  //   }
  //   res.render('myitems',{userProfile:req.session.userProfile});
  // }
});


// router.get('/feedback', function(req, res) {
//     res.render('feedback');
// });


// var categories = [];
// let getCategories = function() {
//     var data = itemDb.getItems();
//     data.forEach(function (item) {
//         if(!categories.includes(item.catalogCategory)){
//             categories.push(item.catalogCategory);
//         }
//       });
//     return categories;
// };

// If the itemCode is not there I am redirecting to catalog route
router.get('/*', function(req, res) {
  if(req.session.theUser){
    res.render('index', {userProfile : req.session.userProfile});
  }
  else {
    res.render('index', {userProfile : null});
  }
    // res.redirect('/categories/catalog');
});

module.exports = router;
