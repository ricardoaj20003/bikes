const prefix = '/pedidos',
  Order = require('../models/order').Order,
  OrderControl = require('../models/order_control').OrderControl,
  Address = require('../models/address').Address,
  PaymentDetail = require('../models/payment_detail.js').PaymentDetail,
  WeekReport = require('../models/week_report').WeekReport,
  Person = require('../models/person').Person;

module.exports = function (fastify, opts, next) {
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
      Order.fetchAll({ withRelated: ['address', 'person', 'paymentDetail'] }).then(function (orders) {
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
            id: { type: 'integer' },
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
      return new Order.withUserDetails(request.params).then( (order) => {
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
              type: 'object',
              properties: {
                references_notes: { type: 'string' },
                origin: { type: 'string' },
                destination: { type: 'string' },
                distance: { type: 'number' }
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
      return new Order({user_id: request.body.user_id}).save()
        .then(function (order) {
          return new Address(request.body.address).save({ 'order_id': order.id })
            .then(function () {
              return Order.where({ id: order.id }).fetch({ withRelated: ['address'] })
                .then(function (order) {
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
            id: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                celular: { type: 'string' }
              }
            }
          }
        },
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
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
      return Order.where(request.params).fetch({ withRelated: ['address', 'person'] })
        .then(function (order) {
          return new Person(request.body.person).save({ 'order_id': orderId })
            .then(function (person) {
              return Order.where(request.params).fetch({ withRelated: ['address', 'person'] })
                .then(function (order) {
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
            credit: { type: 'boolean' },
            invoice: { type: 'boolean' },
            total: { type: 'number' },
            iva: { type: 'number' }
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
      return Order.where(request.params).fetch({ withRelated: ['address', 'person', 'paymentDetail'] })
        .then(function (order) {
          if (order.relations.paymentDetail.attributes.id)
            return response.send(order);

          let data = request.body;
          data.orderId = request.params.id;
          return new PaymentDetail(data.payment_detail).save({ 'order_id': data.orderId })
            .then(paymentDetail => {
              paymentDetail.makeLastOrderProcess(data).then((order) => {
                return response.send(order);
              });
            });
        });

    });
  fastify.get(`${prefix}/week_report`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Obtener el reporte semanal',
        tags: ['Pedidos'],
        summary: 'Reporte semanal',
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
      return WeekReport.fetchAll().then(function (report_data) {
        return response.send(report_data);
      });
    });
  fastify.delete(`${prefix}/:id`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Obtener el reporte semanal',
        tags: ['Pedidos'],
        summary: 'Reporte semanal',
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
      return Order.forge(request.params).fetch({ withRelated: ['address', 'person', 'paymentDetail'] })
        .then((order) => {
          if (!order)
            return response.status(404).send({ error: true, message: 'Pedido no encontrado' });
          
          return response.send(order.removeRelations());
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
            id: { type: 'integer' },
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
      return Order.where(request.params).fetch({ withRelated: ['address', 'person', 'paymentDetail'] })
        .then(function (order) {
          if (!order)
            return response.send('Pedido no localizado');

          if (order.attributes.close_at)
            return response.send(order);

          return order.save({ active: false, close_at: new Date() }, { patch: true }).then(function (order) {
            return response.send(order);
          });
        });
    });

  fastify.get(`${prefix}/:id/start`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Comienza el proceso de entrega un pedido en base a su id',
      tags: ['Pedidos'],
      summary: 'Iniciar pedido',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
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
    return Order.where(request.params).fetch({ withRelated: ['address', 'person', 'paymentDetail'] })
      .then(function (order) {
        if (!order)
          return response.send({ error: 'Pedido no localizado' });

        if (order.attributes.start_at)
          return response.send(order);

        return order.save({ start_at: new Date() }, { patch: true }).then(function (order) {
          return response.send(order);
        });
      });
  });
  fastify.get(`${prefix}/:id/cancel`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Cancela un pedido solo si esta en pendiente en base a su id',
      tags: ['Pedidos'],
      summary: 'Cancela pedido',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
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
    return Order.where(request.params).fetch()
      .then(function (order) {
        if (!order)
          return response.send({error: 'Pedido no localizado'});
        
        if (order.start_at)
          return response.send({error: 'Tu pedido ya se encuentra en camino'});

        return order.save({ active: false, cancel_at: new Date() }, { patch: true }).then(function (order) {
          return response.send(order);
        });
      });
  });
  fastify.post(`${prefix}/complete_process`,
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
              type: 'object',
              properties: {
                references_notes: { type: 'string' },
                origin: { type: 'string' },
                destination: { type: 'string' },
                distance: { type: 'number' }
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
      return User.where({id: request.body.user_id}).fetch()
        .then( user => {
          return user.makeOrder(request.body)
            .then(order => {
              return response.send(order);
            })
            .catch(err => {
              return response.send(err);
            });
        });
    });
  return next();
};
