/*load express*/
var express = require('express');
var app = express();

/*load bodyParser*/
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res){
    //res.send('Hello World');
    res.json({message: 'Hello there!!!'});
});

var cats = require('./cats.js')(app);

var server = app.listen(3000, function(){
    console.log('Server running at http://127.0.0.1:3000/');
});

/*http.createServer(
    function(req, res){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Hello World\n');
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');*/

