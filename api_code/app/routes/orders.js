const prefix = '/pedidos',
      Order = require('../models/order').Order,
      Address = require('../models/address').Address,
      PaymentDetail  = require('../models/payment_detail.js').PaymentDetail,
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
      description: 'Se da la informacion del usuario',
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
            type: 'string',
            description: 'Direcion'
          },
          references_notes: {
            type: 'string',
            description: 'Referencias del domicilio'
          },
          destination: {
            type: 'string',
            description: 'Lugar de destino'
          },
          distance: {
            type: 'number',
            description: 'Distancia a recorrer'
          },
          origin: {
            type: 'string',
            description: 'Domicilio del remitente'
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
          name: {
            type: 'string',
            description: 'nombre de usuario'
          },
          email: {
            type: 'string',
            description: 'correo electronico del usuario'
          },
          celular: {
            type: 'integer',
            description: 'numero de celular'
            
          }
        }
      },
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'boolean',
            description: 'identificador del cliente'
          },
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
    return new Person(request.body.person).save({'order_id': orderId})
      .then(function (person){
        return Order.where(request.params).fetch({withRelated: ['address', 'person']})
          .then(function(order){
            return response.send(order);
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
      summary: 'Detalle de pedidos por id',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'boolean',
            description: 'identificador del cliente'
          },
        }
      },
      body: {
        type: 'object',
        properties: {
          credit: {
            type: 'boolean',
            description: 'especifica si el cliente tiene credito'
          },
          invoice: {
            type: 'boolean',
            description: 'especifica si el cliente tiene credito'
          },
          total: {
            type: 'number',
            description: 'total de la cuenta'
          },
          iva: {
            type: 'number',
            description: 'iva del producto'
            
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
    let orderId = request.params.id;
    return new PaymentDetail(request.body.payment_detail).save({'order_id': orderId})
      .then(function (PaymentDetail){
        return Order.where(request.params).fetch({withRelated: ['address', 'person', 'paymentDetail']})
          .then(function(order){
            return response.send(order);
          });
      });
  });

  return next();
};
