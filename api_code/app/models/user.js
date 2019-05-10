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
    return Order.where('id', 'IN', ids).fetchAll({ withRelated: ['address', 'person', 'paymentDetail'] });
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
  }
});

function prepagoLogic(priceRate, user){
  let Order = require('./order').Order;
  return Order.query({where: {user_id: user.id, active: true}, andWhereRaw: `EXTRACT(MONTH FROM created_at::date) = ${new Date().getMonth() + 1}`}).fetchAll().then( orders => {
    return priceRate.prepagoObject().then( (prepago) => {
      return {availables: parseInt(prepago.attributes.orders) - orders.length}
    });
  });
}

module.exports = {
  User : User
};