const config = require('./base'),
      bookshelf = require('bookshelf')(config.knex);

let PaymentDetail = bookshelf.Model.extend({
  tableName: 'payment_details',
  hasTimestamps: true,
  pedido: function(){
    let Order = require('./order').Order;
    return this.belongsTo(Order);
  },
  couponControl: function(){
    let CouponControl = require('./coupon_control').CouponControl;
    return this.belongsTo(CouponControl);
  },
  makeLastOrderProcess: function(data){
    let Order = require('./order').Order;
    return Order.where({ id: data.orderId }).fetch({ withRelated: ['address', 'person', 'paymentDetail'] })
      .then(function (order) {
        if (order) {
          let OrderControl = require('./order_control').OrderControl;
          return new OrderControl({ order_id: order.id }).save(null, { method: 'insert' })
            .then(function (order_control) {
              return OrderControl.where({ order_id: order.id }).fetch().then((order_control) => {
                let Roundsman = require('./roundsman').Roundsman;
                return Roundsman.where({ id: order_control.attributes.roundsman_id }).fetch({ withRelated: ['order_control'] }).then(function (roundsman) {
                  let address = order.relations.address;
                  let name = order.relations.person.attributes.name;
                  let cel = order.relations.person.attributes.celular;
                  let price = order.relations.paymentDetail.attributes.total;
                  let notes = address.attributes.references_notes;
                  let message = `Origen: ${address.attributes.origin}, Destino: ${address.attributes.destination}, Nombre: ${name}, Celular: ${cel}, Precio: ${price}, Comentarios: ${notes}`;
                  if (data.coupon_control_id) {
                    let CouponControl = require('./coupon_control').CouponControl;
                    return CouponControl.where({ id: data.coupon_control_id }).fetch().then((couponControl) => {
                      return couponControl.couponObject().then((coupon) => {
                        if (coupon.attributes.remove_message) {
                          let re = new RegExp(`${coupon.attributes.remove_message}.*,`, "g");
                          message = message.replace(re, ' Pedido sin cobro,');
                        }
                        //roundsman.assign_order(message, orderId);
                        return new Promise( (resolve, reject) => { resolve(order)});
                      });
                    });
                  }
                  //roundsman.assign_order(message, orderId);
                  return new Promise((resolve, reject) => { resolve(order) });
                });
              })
            });
        }

        return new Promise((resolve, reject) => { resolve({error: true, message: 'Pedido no encontrado'}) });
      });
  }
});

module.exports = {
  PaymentDetail : PaymentDetail
};
