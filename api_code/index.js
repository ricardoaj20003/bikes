require('dotenv').config();
const fastify = require('fastify')({
  logger: true
}),
  jwt = require('jsonwebtoken'),
  cors = require('cors');


fastify.register(require('fastify-swagger'), {
  swagger: {
    securityDefinitions: {
      Bearer: {
      type: 'apiKey',
      name: 'token',
      in: 'header',
      }
    },
    info: {
      title: 'Don mandón API',
      description: 'Documentación del api don mandón',
      version: '1.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },

  exposeRoute: true
});

fastify.register(require('fastify-url-data'), (err) => {
  if (err) throw err;
});

fastify.use(cors());
fastify.options('*', (request, reply) => { reply.send(); });

fastify.addHook('preHandler', (request, response, next) => {
  let urlData = request.urlData();
  let tokenDecode = {};
  if (
    urlData.path !== '/users/sign_in' &&
    !urlData.path.match(/\/documentation\//) &&
    !urlData.path.match(/\/facebook_logic\//) &&
    !urlData.path.match(/close/)
  ){
    if (!request.headers.token)
      response.send({ error: 'Token invalido' });

    try {
      tokenDecode = jwt.verify(request.headers.token, process.env.TOKEN_SECRET);
    } catch (err) {
      response.send({ error: 'Token invalido' });
    }
  }

  if (tokenDecode.data)
    aditionId(request, tokenDecode.data);

  next();
});

function aditionId(request, userData){
  if (request.body)
    return request.body.user_id = userData.id;
  
  if (
    request.urlData().path.match(/users/)
  )
    request.params.id = userData.id;
}

fastify.register(require('./app/routes/users'));
fastify.register(require('./app/routes/price_rates'));
fastify.register(require('./app/routes/coupons'));
fastify.register(require('./app/routes/orders'));
fastify.register(require('./app/routes/facebook_logic'));
fastify.register(require('./app/routes/roundsman'));
fastify.register(require('./app/routes/conversation_codes'));

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
