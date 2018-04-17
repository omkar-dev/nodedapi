const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/


var app = express();  
var server = require('http').createServer(app);  
app.use(express.static(__dirname + '/node_modules'));  
app.get('/', (req, res) => res.send('Hello World!'))


server.listen(3018);  
