const config = require('./base'),
  bookshelf = require('bookshelf')(config.knex);

let Prepago = bookshelf.Model.extend({
  tableName: 'prepagos',
  priceRate: function () {
    let PriceRate = require('./price_rate').PriceRate;
    return this.hasOne(PriceRate);
  },
});

module.exports = {
  Prepago : Prepago
};