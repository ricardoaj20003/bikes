const prefix = '/pedidos',
      Pedido = require('../models/pedido').Pedido,
      Address = require('../models/address').Address,
      PaymentDetail  = require('../models/payment_detail.js').PaymentDetail,
      Person  = require('../models/person').Person;


module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`, 
  {
    schema: {
      description: 'Se dan los pedidos creados',
      tags: ['Pedidos'],
      summary: 'da todos los pedidos',
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  },
  (request, response) => {
      return response.send({ hello: 'world' });
    });

  fastify.get(`${prefix}/:id`, 
  {
    schema: {
      description: 'Se dan los pedidos creados',
      tags: ['Pedidos'],
      summary: 'da todos los pedidos',
      params: {
        type: 'object',
        properties: {
          peluchito: {
            type: 'string',
            description: 'user id'
          },
          JAMON: {
            type: 'string',
            description: 'me gusta el jamon'
            
          }
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  },
  (request, response) => {
    return Pedido.where(request.params).fetch({withRelated: ['address']})
      .then(function(pedido){
        return response.send(pedido);
      });
    });

  fastify.post(`${prefix}`,
  {
    schema: {
      description: 'Se dan los pedidos creados',
      tags: ['Pedidos'],
      summary: 'da todos los pedidos',
      params: {
        type: 'object',
        properties: {
          peluchito: {
            type: 'string',
            description: 'user id'
          },
          JAMON: {
            type: 'string',
            description: 'me gusta el jamon'
            
          }
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  },
  (request, response) => {
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

  fastify.post(`${prefix}/:id/add_person`,
  {
    schema: {
      description: 'Se dan los pedidos creados',
      tags: ['Pedidos'],
      summary: 'da todos los pedidos',
      params: {
        type: 'object',
        properties: {
          peluchito: {
            type: 'string',
            description: 'user id'
          },
          JAMON: {
            type: 'string',
            description: 'me gusta el jamon'
            
          }
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  },
  (request, response) => {
    let pedidoId = request.params.id;
    return new Person(request.body.person).save({'pedido_id': pedidoId})
      .then(function (person){
        return Pedido.where(request.params).fetch({withRelated: ['address', 'person']})
          .then(function(pedido){
            return response.send(pedido);
          });
      });
  });

  fastify.post(`${prefix}/:id/add_payment_detail`,
  {
    schema: {
      description: 'Se dan los pedidos creados',
      tags: ['Pedidos'],
      summary: 'da todos los pedidos',
      params: {
        type: 'object',
        properties: {
          peluchito: {
            type: 'string',
            description: 'user id'
          },
          JAMON: {
            type: 'string',
            description: 'me gusta el jamon'
            
          }
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  },
  (request, response) => {
    let pedidoId = request.params.id;
    return new PaymentDetail(request.body.payment_detail).save({'pedido_id': pedidoId})
      .then(function (PaymentDetail){
        return Pedido.where(request.params).fetch({withRelated: ['address', 'person', 'paymentDetail']})
          .then(function(pedido){
            return response.send(pedido);
          });
      });
  });

  return next();
};
