const config = require('./base'),
      bcrypt = require('bcrypt'),
      bookshelf = require('bookshelf')(config.knex);

let User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', (model, attrs, options) => {
      let that = this;
      return this.hashPassword().then((hash) => {
        return that.set('password', hash);
      });
    }, this);
  },
  priceRate : function() {
    let PriceRate = require('./price_rate').PriceRate;
    return this.belongsTo(PriceRate);
  },
  orders: function () {
    let Order = require('./order').Order;
    return this.hasMany(Order);
  },
  ordersWithAllData () {
    let Order = require('./order').Order;
    let ids = this.relations.orders.map(order => order.id)
    return Order.where('id', 'IN', ids).orderBy('close_at', 'DESC').orderBy('start_at', 'ASC').fetchAll({ withRelated: ['address', 'person', 'paymentDetail'] });
  },
  priceRateObject: function(){
    return this.priceRate()
      .where({id: this.attributes.price_rate_id}).fetch().then(priceRate => {
        if (priceRate.attributes.prepago_id)
          return prepagoLogic(priceRate, this.attributes);

        return priceRate;
      });
  },
  hashPassword: function(){
    return bcrypt.hash(this.attributes.password, 8);
  },
  validatePassord: function(comparePassword){
    return bcrypt.compare(comparePassword, this.attributes.password);
  },
  makePrepago: function(data){
    let PriceRate = require('./price_rate').PriceRate;
    let that = this;
    return PriceRate.where({prepago_id: data.prepagoId}).fetch().then( priceRate => {
      return that.save({ price_rate_id: priceRate.id, prepago_active: false, prepago_start_at: null }, { patch: true }).then(function (user) {
        return user;
      });
    });
  },
  makeOrder: function(data){
    let user = this;
    let Order = require('./order').Order;
    return new Order({ user_id: data.user_id }).save()
      .then( order => {
        let Address = require('./address').Address;
        return new Address(data.address).save({ 'order_id': order.id })
          .then( () => {
            let personData = {
              "name": user.name,
              "celular": user.phone,
              "email": user.email
            }
            let Person = require('./person').Person;
            return new Person(personData).save({ 'order_id': order.id })
              .then(() => {
                let PaymentDetail = require('./payment_detail').PaymentDetail;
                return new PaymentDetail(data.payment_detail).save({ 'order_id': order.id })
                  .then(paymentDetail => {
                    data.orderId = order.id;
                    return paymentDetail.makeLastOrderProcess(data);
                  });
              });
          });
      });
  }
}, {
  notPrepago: function(){
    let Prepago = require('./prepago').Prepago;
    let User = this;
    return Prepago.fetchAll().then( prepagos => {
      let PriceRate = require('./price_rate').PriceRate;
      let ids = prepagos.map(prepago => { return prepago.id });
      return PriceRate.where('prepago_id', 'IN', ids).fetchAll().then( priceRates => {
        let ids = priceRates.map(priceRate => { return priceRate.id });
        return User.where('price_rate_id', 'NOT IN', ids).fetchAll();
      });
    });
  }
});

function prepagoLogic(priceRate, user){
  let Order = require('./order').Order;
  let endDateProcess = new Date(user.prepago_start_at);
  endDateProcess.setMonth(endDateProcess.getMonth() + 1);
  return Order.query({where: {user_id: user.id, active: true}, whereBetween: ['created_at', [user.prepago_start_at, endDateProcess]] }).fetchAll().then( orders => {
    return priceRate.prepagoObject().then( (prepago) => {
      return {availables: parseInt(prepago.attributes.orders) - orders.length, priceRate: priceRate}
    });
  });
}

module.exports = {
  User : User
};
