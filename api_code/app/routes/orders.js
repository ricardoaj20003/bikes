const prefix = '/pedidos',
      Order = require('../models/order').Order,
      Address = require('../models/address').Address,
      PaymentDetail  = require('../models/payment_detail.js').PaymentDetail,
      Person  = require('../models/person').Person;


module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`, (request, response) => {
      Order.fetchAll({withRelated: ['address', 'person', 'paymentDetail']}).then(function(orders){
        return response.send(orders);
      });
    });

  fastify.get(`${prefix}/:id`, (request, response) => {
    return Order.where(request.params).fetch({withRelated: ['address', 'person', 'paymentDetail']})
      .then(function(order){
        return response.send(order);
      });
    });

  fastify.post(`${prefix}`, (request, response) => {
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

  fastify.post(`${prefix}/:id/add_person`, (request, response) => {
    let orderId = request.params.id;
    return new Person(request.body.person).save({'order_id': orderId})
      .then(function (person){
        return Order.where(request.params).fetch({withRelated: ['address', 'person']})
          .then(function(order){
            return response.send(order);
          });
      });
  });

  fastify.post(`${prefix}/:id/add_payment_detail`, (request, response) => {
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
