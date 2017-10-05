// Import express and path modules.
var express = require( "express");
var path = require( "path");
// Create the express app.
var app = express();

//***PARSE DATA*****
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// Root route to render the index.ejs view.
app.get('/', function(req, res) {
 res.render("index");
})

//******Configuring Server Side Sockets*******
// we are retrieving an object given to us from the 'app.listen' method
// (we named it 'server'), and we pass the 'server' object into the socket, listen method.
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) { // a single client
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here

  //Listining for an event happening in the client side
  socket.on(  "form_submitted", function (data){
      console.log("This is data that we received",data);
      //emit response/ sending data to the client
      socket.emit( 'server_response', {response: data});
  })


})
