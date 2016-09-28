var express = require('express');
var app = express();

app.use(express.static('../site'));

app.listen(3000, function() {
  console.log('Serving static site on port 3000');
});
