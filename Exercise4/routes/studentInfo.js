var info = require('../models/student.js');
var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
  if (Object.keys(req.query).length === 0){
    res.send('No Information available or Requested as the query does not have request parama');
}
else{
  var obj = info.student(req.query.firstName,req.query.lastName,req.query.degree,req.query.program);
  res.render('main',{student: obj});
}
});

module.exports = router;
