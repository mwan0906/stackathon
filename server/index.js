var express = require('express');
const path = require('path');
const app = express();

var server = app.listen(3000, ()=> {
    console.log('listening')
})

// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(express.static(path.join(__dirname, '..', 'public')))


// send index html page
app.use('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})