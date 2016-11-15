var app = require('express')(),
   http = require('http').Server(app),
   io = require('socket.io')(http),
   bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/push', function (req, res) {
   io.sockets.emit('pushed', req.body);
   res.sendStatus(200);
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('Connection created');
});


http.listen(3000, function () {
   console.log('listening on :3000');
});
