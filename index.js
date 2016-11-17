(function () {
   'use strict';
   var express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      bodyParser = require('body-parser');

   app.use(bodyParser.json());

   app.use(bodyParser.urlencoded({
       extended: true
   }));

   app.use(express.static(__dirname + '/public'));

   app.post('/push', function (req, res) {
      if (req.body && req.body.length > 0) {

         let arpsteps = 3;

         let payload = req.body.map(function (pItem) {
            let fnumber = parseInt(pItem.ammount.toString().charAt(0));
            if (fnumber >= 7) {
               fnumber = 6;
            }
            pItem.fnumber = fnumber.toString();
            return pItem;
         });


         if (payload.length > 2 && payload.length < 7 ) {
            arpsteps = payload.length;
         }

         if (payload.length > 7) {
            arpsteps = 6;
         }

         let chordsNumbers = payload.map(function (pItem) {
            return pItem.fnumber;
         }).slice(0, 8);

         let resultObject = { chordsNumbers, payload, arpsteps };

         io.sockets.emit('pushed', resultObject);
      }

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

})();
