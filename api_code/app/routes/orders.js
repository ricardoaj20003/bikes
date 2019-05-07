const prefix = '/pedidos',
  Order = require('../models/order').Order,
  OrderControl = require('../models/order_control').OrderControl,
  Address = require('../models/address').Address,
  PaymentDetail = require('../models/payment_detail.js').PaymentDetail,
  Roundsman = require('../models/roundsman.js').Roundsman,
  WeekReport = require('../models/week_report').WeekReport,
  CouponControl = require('../models/coupon_control').CouponControl,
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
      return Order.where(request.params).fetch({ withRelated: ['address', 'person', 'paymentDetail'] })
        .then(function (order) {
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
      let orderId = request.params.id;
      return Order.where(request.params).fetch({ withRelated: ['address', 'person', 'paymentDetail'] })
        .then(function (order) {
          if (order.relations.paymentDetail.attributes.id)
            return response.send(order);

          return new PaymentDetail(request.body.payment_detail).save({ 'order_id': orderId })
            .then(function (PaymentDetail) {
              return Order.where(request.params).fetch({ withRelated: ['address', 'person', 'paymentDetail'] })
                .then(function (order) {
                  if (order) {
                    return new OrderControl({ order_id: order.id }).save(null, { method: 'insert' })
                      .then(function (order_control) {
                        return OrderControl.where({ order_id: order.id }).fetch().then((order_control) => {
                          return Roundsman.where({ id: order_control.attributes.roundsman_id }).fetch({ withRelated: ['order_control'] }).then(function (roundsman) {
                            let address = order.relations.address;
                            let name = order.relations.person.attributes.name;
                            let cel = order.relations.person.attributes.celular;
                            let price = order.relations.paymentDetail.attributes.total;
                            let notes = address.attributes.references_notes;
                            let message = `Origen: ${address.attributes.origin}, Destino: ${address.attributes.destination}, Nombre: ${name}, Celular: ${cel}, Precio: ${price}, Comentarios: ${notes}`;
                            if (request.body.coupon_control_id)
                              return CouponControl.where({id: request.body.coupon_control_id}).fetch().then((couponControl) => {
                                return couponControl.couponObject().then((coupon) => {
                                  if (coupon.attributes.remove_message){
                                    let re = new RegExp(`${coupon.attributes.remove_message}.*,`, "g");
                                    message = message.replace(re,' Pedido sin cobro,');
                                  }
                                  roundsman.assign_order(message, orderId);
                                  return response.send(order);
                                });
                              });

                            roundsman.assign_order(message, orderId);
                            return response.send(order);
                          });
                        })
                      })
                      .catch(function (err) {
                        return response.send(err);
                      });
                  }
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
      WeekReport.fetchAll().then(function (report_data) {
        return response.send(report_data);
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

          return order.save({ active: false }, { patch: true }).then(function (order) {
            return response.send(order);
          });
        });
    });
  return next();
};
