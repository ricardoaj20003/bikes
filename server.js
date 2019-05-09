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
  cookie: { maxAge: 5 * 60 * 1000 }
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

app.get('/users/pedidos', (req, res) => {
  makeApiRequest(req, {url: `/users/${req.session.userId}/pedidos`})
    .then(response => {
      return res.send(response.data);
    })
    .catch(error => {
      return res.send(error.response.data);
    });
});

app.delete('/sign_out', (req, res) => {
  req.session.destroy( err => {
    if (err)
      return res.send(error);
    
    return res.send({success: true});
  });
});

function makeApiRequest(req, params = {url: '', headers: {}}){
  let requestConfig = {
    headers: Object.assign({
      'Content-Type': 'application/json',
      'token' : req.session.token || ''
    }, params.headers)
  },
    baseUrl = 'http://localhost:3000';
  if (req.method === 'POST')
    return axios.post(baseUrl + params.url, req.body, requestConfig);
  
  return axios.get(baseUrl + params.url, requestConfig);
}

app.post('/pedidos/:id/add_payment_detail', (req, res) => {
  return makeApiRequest(req, {url: `/pedidos/${req.session.order_id}/add_payment_detail`})
    .then(function (response) {
      let data = response.data;
      data.next_url = '/solicita-gracias'

      if (req.session.coupon)
        return makeApiRequest({url: `/cupones/${req.session.coupon}/apply`})
          .then(response => {
            console.log(req.session.coupon);
            return res.send(data);
          })
          .catch(function (error) {
            return res.send(error.response.data);
          });

      return res.send(data);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});

app.get('/cupones/:coupon/is_valid', (req, res) => {
  return makeApiRequest(req, {url: `/cupones/${req.params.coupon}/is_valid`})
    .then(function (response) {
      req.session.coupon = null;
      if (response.data.code)
        req.session.coupon = response.data.code;

      return res.send(response.data);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});

app.get('/users/price_rate', (req, res) => {
  return makeApiRequest(req, {url: `/users/${req.session.userId}/price_rate`})
    .then(function (response) {
      return res.send(response.data);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});

app.post('/pedidos/:id/add_person', (req, res) => {
  return makeApiRequest(req, {url: `/pedidos/${req.session.order_id}/add_person`})
    .then(function (response) {
      response.data.next_url = '/solicita-pago';
      return res.send(response.data);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});

app.get('/pedidos/:id', (req, res) => {
  return makeApiRequest(req, {url: `/pedidos/${req.session.order_id}`})
    .then(function (response) {
      return res.send(response.data);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});

app.post('/pedidos', (req, res) => {
  return makeApiRequest(req, {url: '/pedidos'})
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
    return makeApiRequest(req, {url: '/users/sign_in'}).then(function (response) {
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
