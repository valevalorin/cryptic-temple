var express = require('express');
var app = express();
var proxy = require('express-http-proxy');

app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));
app.use('/tracks', proxy('sc-redirect.herokuapp.com', {
  forwardPath: function (req) {
    var x = "http://sc-redirect.herokuapp.com/callback.html";
    console.log(x);
    return x;
  }
}));
console.log("proxy going out");
// app.use('/tracks', proxy('google.com'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/launch', function(request, response) {
  response.render('pages/redirect');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
