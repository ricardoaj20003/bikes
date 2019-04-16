const config = require('./base'),
      md5 = require('md5'),
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
  priceRateObject: function(){
    return this.priceRate()
      .where({id: this.attributes.price_rate_id}).fetch();
  },
  hashPassword: function(){
    return bcrypt.hash(md5(this.attributes.password), 18);
  },
  validatePassord: function(comparePassword){
    return bcrypt.compare(md5(comparePassword), this.attributes.password);
  }
});

module.exports = {
  User : User
};