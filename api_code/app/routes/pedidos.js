const prefix = '/pedidos',
      Pedido = require('../models/pedido').Pedido,
      Address = require('../models/address').Address,
      Person  = require('../models/person').Person;


module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`, (request, response) => {
    return response.send({ hello: 'world' });
  });

  fastify.post(`${prefix}`, (request, response) => {
    return new Pedido().save()
      .then(function (pedido) {
        return new Address(request.body.address).save({'pedido_id' : pedido.id})
          .then(function(){
            return new Person(request.body.person).save({'pedido_id' : pedido.id})
              .then(function(){
                return Pedido.where({id: pedido.id}).fetch({withRelated: ['address', 'person']})
                  .then(function(pedido){
                    return response.send(pedido);
                  });
              });
          });
      })
      .catch(function (err) {
        return response.send(err);
      });
  });

  return next();
};
