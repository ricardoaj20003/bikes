const fastify = require('fastify')({
  logger: true
});

fastify.register(require('fastify-swagger'), {
  swagger: {
    info: {
      title: 'Don mandón API',
      description: 'Documentación del api don mandón',
      version: '1.0'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
});

fastify.addHook('preHandler', (request, reply, next) => {
  console.log('Si');
  next();
});

fastify.register(require('./app/routes/orders'));
fastify.register(require('./app/routes/facebook_logic'));

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
