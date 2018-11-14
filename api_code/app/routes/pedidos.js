const prefix = '/pedidos',
      Pedido = require('../models/pedido').Pedido,
      Address = require('../models/address').Address,
      Person  = require('../models/person').Person;


module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`,
    {
      schema: {
        description: 'Optener todos los pedidos',
        tags: ['Pedidos'],
        summary: 'Retorna los pedidos',
      }
    },
    (request, response) => {
      return response.send({ hello: 'world' });
    });

  fastify.post(`${prefix}`, (request, response) => {
    return new Pedido().save()
      .then(function (pedido) {
        return new Address(request.body.address).save({'pedido_id' : pedido.id})
          .then(function(){
            return Pedido.where({id: pedido.id}).fetch({withRelated: ['address']})
              .then(function(pedido){
                return response.send(pedido);
              });
          });
      })
      .catch(function (err) {
        return response.send(err);
      });
  });

  return next();
};
