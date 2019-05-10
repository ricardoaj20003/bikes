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
});

module.exports = {
  PriceRate : PriceRate
};