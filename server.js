var fs = require("fs");
var host = "localhost";
var port = 3003;
var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(__dirname + '/app'));

app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', (req, res) => {
  res.render('index.html');
})
app.get('/admin', (req, res) => {
  res.render('admin.html');
})
app.get('/faq', (req, res) => {
  res.render('faq.html');
})
app.get('/nosotros', (req, res) => {
  res.render('nosotros.html');
})
app.get('/solicita', (req, res) => {
  res.render('solicita.html');
})
app.get('/solicita-pago', (req, res) => {
  res.render('solicita-pago.html');
})
app.get('/solicita-gracias', (req, res) => {
  res.render('solicita-gracias.html');
})
app.get('/terminos-condiciones', (req, res) => {
  res.render('terminos-condiciones.html');
})

app.get('/landing', (req, res) => {
  res.render('landing.html');
})
app.get('*', (req, res) => {
  res.render('404.html');
})

app.listen(port, host);
