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
  couponControl: function() {
    let  CouponControl   = require('./coupon_control').CouponControl;
    return this.hasMany(CouponControl);
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