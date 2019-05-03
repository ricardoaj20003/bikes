var fs = require("fs");
var host = "localhost";
var port = 3003;
var express = require("express");
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var app = express();

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore(),
  cookie: { maxAge: 6000 }
}));

app.use(express.static(__dirname + '/app'));

app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function (req, res, next) {
  if (typeof req.session.views === 'undefined')
    req.session.views = 1;
  else
    req.session.views += 1;

  next();
});

app.get('/', (req, res) => {
  res.render('index.html', {data: 'algo'});
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
app.get('/negocios', (req, res) => {
  res.render('negocios.html');
})
app.get('/landing', (req, res) => {
  res.render('landing.html');
})
app.get('/reporte_semanal', (req, res) => {
  res.render('reporte_semanal.html');
})

app.post('/sign_in', (req, res) => {
  let axios = require('axios');

  const requestConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };


  return axios.post('http://localhost:3000/users/sign_in', {
    "username": "sorsucrelFinal",
    "password": "123456789"
  }, requestConfig)
    .then(function (response) {
      console.log(response.data);
      return res.send({});
    })
    .catch(function (error) {
      return res.send({}).status(401);
    });
});

app.get('*', (req, res) => {
  res.redirect('/');
})

app.listen(port, host);
