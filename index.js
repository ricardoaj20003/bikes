const fastify = require('fastify')({
  logger: true
});

fastify.register(require('./app/routes/pedidos'));

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
