var express = require('express');
const path = require('path');
const app = express();

// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// send index html page
app.use('*', (req, res, next) => {
  console.log('???????????');
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

var server = app.listen(process.env.PORT || 3000, () => {
  console.log('listening');
});
