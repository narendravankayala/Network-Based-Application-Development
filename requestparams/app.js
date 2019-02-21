var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('stuff'));

app.get('/', function (req, res) {
// res.sendFile(__dirname +'/index.html');
res.render('index')
});


app.get('/contact', function (req, res) {
  console.log(req.query);
  res.render('contact', {qs : req.query})
// res.send('This is the contact page');
});

app.get('/profile/:name', function (req, res) {
  var data = {age: 30, job:'SWE', hobbies :['eating', 'watchingmovies', 'playing']}
  res.render('profile', {person: req.params.name, data:data});
  // res.send('Your request to see the profile with the id of '+ req.params.id)
});
app.listen(3000);



































































// console.log("hey whatsup");
// var stuff = require('./stuff');
// console.log(stuff.counter([1,2,3,4,5]));
// console.log(stuff.adder(2,4));
// console.log(stuff.pi);
//
// var events = require('events');
// var util = require('util');
//
// var myEmitter = new events.EventEmitter();
//
// myEmitter.on('someEvent', function (mssg) {
//   console.log(mssg);
// });
//
//
// myEmitter.emit('someEvent', 'The event was emitted');
//
// var Person = function(name) {
//   this.name  = name;
// };
// util.inherits(Person, events.EventEmitter);
//
// var narendra = new Person('narendra');
// var lipsa = new Person('lipsa');
// var kumar = new Person('kumar');
//
// var people = [narendra,lipsa,kumar];
//
// people.forEach(function (person) {
//   person.on('speak',function (mssg) {
//     console.log(person.name + ' said' + mssg);
//   });
// });
// narendra.emit('speak', ' hey dude ! how are you ? ');
// lipsa.emit('speak', ' I am good');
// kumar.emit('speak', ' I am not able to understand');
//
//
// var fs = require('fs');
// var readMe = fs.readFileSync('readMe.txt','utf8');
// console.log(readMe);
// fs.writeFileSync('writeMe.txt',readMe);
//
//
// fs.readFile('readMe.txt','utf8',function (err, data) {
//   console.log(data);
//   fs.writeFile('writeMe.txt', data,function (err,data) {
//     console.log('written into file');
// });
// });
// console.log('Async test');
// // fs.mkdirSync('stuff');
// fs.mkdir('stuff', function () {
//   fs.readFile('readMe.txt','utf8',function (err,data) {
//     fs.writeFile('./stuff/writeMe.txt',data,function(err,data) {
//       console.log('written into stuff directory');
//
//     });
//   });
// });
//
// fs.unlink('./stuff/writeMe.txt',function () {
//   fs.rmdir('stuff',function () {
//     console.log('removed stuff directory and file');
//   });
// });




// var fs = require('fs');
// var http = require('http');
// var server = http.createServer(function(req, res){
//     console.log('request was made succesfully ' + req.url);
// if(req.url === '/home' || req.url === '/'){
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         fs.createReadStream(__dirname + '/index1.html').pipe(res);
// }
// else if(req.url === '/contact'){
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         fs.createReadStream(__dirname + '/contact.html').pipe(res);
//     }
// else if(req.url === '/api/person'){
//         var person = [{
//           myName : 'Narendra',
//           occupation: 'Student',
//           Number : '12345678'
//         },
//          {address: 'Barton Charlotte', City: 'Charlotte'}];
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify(person));
//     }else{
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         fs.createReadStream(__dirname + '/404.html').pipe(res);
//     }
//   });
// server.listen(3000,'127.0.0.1');
// console.log('I am listening to port 3000 ! Let us rock ');
// console.log('Successful');
