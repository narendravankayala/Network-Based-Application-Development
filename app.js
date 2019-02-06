console.log("hey whatsup");
var stuff = require('./stuff');
console.log(stuff.counter([1,2,3,4,5]));
console.log(stuff.adder(2,4));
console.log(stuff.pi);

var events = require('events');
var util = require('util');

var myEmitter = new events.EventEmitter();

myEmitter.on('someEvent', function (mssg) {
  console.log(mssg);
});


myEmitter.emit('someEvent', 'The event was emitted');

var Person = function(name) {
  this.name  = name;
};
util.inherits(Person, events.EventEmitter);

var narendra = new Person('narendra');
var lipsa = new Person('lipsa');
var kumar = new Person('kumar');

var people = [narendra,lipsa,kumar];

people.forEach(function (person) {
  person.on('speak',function (mssg) {
    console.log(person.name + ' said' + mssg);
  });
});
narendra.emit('speak', ' hey dude ! how are you ? ');
lipsa.emit('speak', ' I am good');
kumar.emit('speak', ' I am not able to understand');


var fs = require('fs');
var readMe = fs.readFileSync('readMe.txt','utf8');
console.log(readMe);
fs.writeFileSync('writeMe.txt',readMe);


fs.readFile('readMe.txt','utf8',function (err, data) {
  console.log(data);
  fs.writeFile('writeMe.txt', data,function (err,data) {
    console.log('written into file');
});
});
console.log('Async test');
// fs.mkdirSync('stuff');
fs.mkdir('stuff', function () {
  fs.readFile('readMe.txt','utf8',function (err,data) {
    fs.writeFile('./stuff/writeMe.txt',data,function(err,data) {
      console.log('written into stuff directory');

    });
  });
});

fs.unlink('./stuff/writeMe.txt',function () {
  fs.rmdir('stuff',function () {
    console.log('removed stuff directory and file');
  });
});

var http = require('http');

var server = http.createServer(function (req, res) {
  console.log('request was made successfully' + req.url);
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.end('Hey I am listening')
});

server.listen(3000,'127.0.0.1');
console.log('I am listening to port 3000 ! Let us rock ');
