const config = require('./base'),
  bookshelf = require('bookshelf')(config.knex);

let PriceRate = bookshelf.Model.extend({
  tableName: 'price_rates',
  hasTimestamps: true,
  users: function () {
    let User = require('./user').User;
    return this.hasMany(User);
  },
  prepago: function () {
    let Prepago = require('./prepago').Prepago;
    return this.belongsTo(Prepago);
  },
  prepagoObject: function () {
    return this.prepago()
      .where({id: this.attributes.prepago_id}).fetch();
  }
}, {
  createCustom: function(ordersCount){
    let Prepago = require('./prepago').Prepago,
        price = parseInt(ordersCount) * 15;
    return new Prepago({price: price, orders: ordersCount}).save()
      .then( prepago => {
        let insertObject = {
          distance: 11000.00,
          price: 15.00,
          unit_price: 4.50,
          unit_distance: 1000.00,
          prepago_id: prepago.id
        }

        return this.forge(insertObject).save();
      });
  }
});

module.exports = {
  PriceRate : PriceRate
};