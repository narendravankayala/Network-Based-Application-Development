var student = function(fn,ln,d,p){
   var studentinfo = {firstname: fn , lastname: ln , degree: d,  program: p };
  return studentinfo;
};

module.exports.student = student;
