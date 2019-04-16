const config = require('./base'),
  bookshelf = require('bookshelf')(config.knex);

let PriceRate = bookshelf.Model.extend({
  tableName: 'price_rates',
  hasTimestamps: true,
  users: function () {
    let User = require('./user').User;
    return this.hasMany(User);
  }
});

module.exports = {
  PriceRate : PriceRate
};