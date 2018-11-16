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

fastify.register(require('./app/routes/pedidos'));
fastify.register(require('./app/routes/facebook_logic'));

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
