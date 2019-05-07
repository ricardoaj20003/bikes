const fs = require("fs");
const host = "localhost";
const port = 3003;
const express = require("express");
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const axios = require('axios');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(session({
  name: 'sessiones-rare-expecial-name-complete-full',
  secret: 'uniq-and-secret data to encript-data',
  saveUninitialized: true,
  resave: true,
  store: new FileStore(),
  cookie: { maxAge: 10 * 60 * 1000 }
}));

app.use(express.static(__dirname + '/app'));

app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index.html');
});
app.get('/admin', (req, res) => {
  if (req.session.userId)
    return res.render('admin.html', {userId: req.session.userId, token: req.session.token});

  return res.render('admin.html', {userId: false, token: false});
});
app.get('/faq', (req, res) => {
  res.render('faq.html');
});
app.get('/nosotros', (req, res) => {
  res.render('nosotros.html');
});
app.get('/solicita', (req, res) => {
  res.render('solicita.html', {idPedido: req.session.order_id});
});
app.get('/solicita-pago', (req, res) => {
  res.render('solicita-pago.html');
});
app.get('/solicita-gracias', (req, res) => {
  res.render('solicita-gracias.html');
});
app.get('/terminos-condiciones', (req, res) => {
  res.render('terminos-condiciones.html');
});
app.get('/negocios', (req, res) => {
  res.render('negocios.html');
});
app.get('/landing', (req, res) => {
  res.render('landing.html');
});
app.get('/reporte_semanal', (req, res) => {
  res.render('reporte_semanal.html');
});

app.get('/pedidos/:id', (req, res) => {
  let requestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'token' : req.session.token
    }
  };

  return axios.get(`http://localhost:3000/pedidos/${req.params.id}`, requestConfig)
    .then(function (response) {
      return res.send(response.data);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});

app.post('/pedidos', (req, res) => {
  let requestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'token' : req.session.token
    }
  };

  return axios.post('http://localhost:3000/pedidos', req.body, requestConfig)
    .then(function (response) {
      if (response.data.error)
        return res.send(response.data);
      
      req.session.order_id = response.data.id;
      return res.send({next_url: '/solicita'});
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });

});

app.post('/sign_in', (req, res) => {
  let requestConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.post('http://localhost:3000/users/sign_in', req.body, requestConfig)
    .then(function (response) {
      let jwt = require('jsonwebtoken');
      let userData = response.data;

      req.session.token = userData.token
      if (userData.token){
        userData = jwt.verify(response.data.token, 'unacosasecretamas').data;
      }

      req.session.userId = userData.id;
      return res.send(userData);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, host);
