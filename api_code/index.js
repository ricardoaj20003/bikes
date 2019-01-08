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
  return next();
  let urlData = request.urlData();
  if (
    urlData.path !== '/users/sign_in' &&
    !urlData.path.match(/\/documentation\//) &&
    !urlData.path.match(/\/facebook_logic\//) &&
    !urlData.path.match(/close/)
  )
    try {
      jwt.verify(request.headers.token, process.env.TOKEN_SECRET);
    } catch (err){
      response.send({error: 'Token invalido'});
    }

  next();
});

fastify.register(require('./app/routes/users'));
fastify.register(require('./app/routes/orders'));
fastify.register(require('./app/routes/facebook_logic'));
fastify.register(require('./app/routes/roundsman'));
fastify.register(require('./app/routes/conversation_codes'));

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
