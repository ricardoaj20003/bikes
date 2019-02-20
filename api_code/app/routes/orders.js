const prefix = '/pedidos',
  Order = require('../models/order').Order,
  Address = require('../models/address').Address,
  PaymentDetail  = require('../models/payment_detail.js').PaymentDetail,
  Roundsman  = require('../models/roundsman.js').Roundsman,
  Person  = require('../models/person').Person;


module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
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
      Order.fetchAll({withRelated: ['address', 'person', 'paymentDetail']}).then(function(orders){
        return response.send(orders);
      });
    });

  fastify.get(`${prefix}/:id`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Recibe la direccion , nombre de la persona y el detalle de pago',
      tags: ['Pedidos'],
      summary: 'Recibe la informacion del usuario',
      params: {
        type: 'object',
        properties: {
          id: {type: 'integer'},
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
    return Order.where(request.params).fetch({withRelated: ['address', 'person', 'paymentDetail']})
      .then(function(order){
        return response.send(order);
      });
  });

  fastify.post(`${prefix}`, 
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Crea los pedidos',
      tags: ['Pedidos'],
      summary: 'crea la peticion',
      body: {
        type: 'object',
        properties: {
          address: {
            type:'object',
            properties: {
              references_notes: {type:'string'},
              origin:{type:'string'},
              destination:{type:'string'},
              distance:{type:'number'}
            }
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
      return new Order().save()
        .then(function (order) {
          return new Address(request.body.address).save({'order_id' : order.id})
            .then(function(){
              return Order.where({id: order.id}).fetch({withRelated: ['address']})
                .then(function(order){
                  return response.send(order);
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
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Agrega persona',
      tags: ['Pedidos'],
      summary: 'agrega persona',
      body: {
        type: 'object',
        properties: {
          id:{
            type:'object',
            properties: {
              name: {type: 'string'},
              email: {type: 'string'},
              celular: {type: 'string'}
            }
          }
        }
      },
        params: {
          type: 'object',
          properties: {
            id: {type: 'integer'},
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
      let orderId = request.params.id;
      return Order.where(request.params).fetch({withRelated: ['address', 'person']})
        .then(function(order){
          if (order)
            return response.send(order);

          return new Person(request.body.person).save({'order_id': orderId})
            .then(function (person){
              return Order.where(request.params).fetch({withRelated: ['address', 'person']})
                .then(function(order){
                  return response.send(order);
                });
            });
        });
    });

  fastify.post(`${prefix}/:id/add_payment_detail`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Se dan los pedidos creados',
      tags: ['Pedidos'],
      summary: 'da todos los pedidos',
      params: {
        type: 'object',
        properties: {
          credit: {type: 'boolean'},
          invoice: {type: 'boolean'},
          total: {type: 'number'},
          iva: {type: 'number'}
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
      } }
  },
  (request, response) => {
    let orderId = request.params.id;
    return Order.where(request.params).fetch({withRelated: ['address', 'person', 'paymentDetail']})
      .then(function(order){
        if (order.relations.paymentDetail.attributes.id)
          return Roundsman.where({id: 1}).fetch().then(function(roundsman){
	    let address = order.relations.address;
	    let message = `Origen: ${address.attributes.origin}, Destino: ${address.attributes.destination}`;
	    roundsman.assign_order(order.attributes.id, message);
	    return response.send(order);
          });

        return new PaymentDetail(request.body.payment_detail).save({'order_id': orderId})
          .then(function (PaymentDetail){
            return Order.where(request.params).fetch({withRelated: ['address', 'person', 'paymentDetail']})
              .then(function(order){
                if (order) {
                  return Roundsman.where({id: 1}).fetch().then(function(roundsman){
                    let address = order.relations.address;
                    let message = `Origen: ${address.attributes.origin}, Destino: ${address.attributes.destination}`;
                    roundsman.assign_order(order.attributes.id, message);
                    return response.send(order);
                  });
                }
              });
          });
      });

  });

  fastify.get(`${prefix}/:id/close`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Cierrar un pedido en base a su id',
      tags: ['Pedidos'],
      summary: 'Cerrar pedido',
      params: {
        type: 'object',
        properties: {
          id: {type: 'integer'},
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
    return Order.where(request.params).fetch({withRelated: ['address', 'person', 'paymentDetail']})
      .then(function(order){
        if (!order)
          return response.send('Pedido no localizado');

        return order.save({active: false}, {patch: true}).then(function(order){
          return response.send(order);
        });
      });
  });
  return next();
};
