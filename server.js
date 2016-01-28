var express = require('express');
var path = require('path');
var webpack = require('webpack');
var app = express();

var isProd = (process.env.NODE_ENV === 'production');
var static_path = path.join(__dirname, 'public');

if (isProd){
  app.use(express.static(static_path))
    .get('/', function (req, res) {
      res.sendFile('index.html', {
        root: static_path
      });
    }).listen(process.env.PORT, function (err) {
      if (err) { console.log(err) };
      console.log('Listening at localhost:8080');
    });
}