const config = require('./base'),
      CouponControl = require('./coupon_control').CouponControl,
      bookshelf = require('bookshelf')(config.knex);

let Coupon = bookshelf.Model.extend({
  tableName: 'coupons',
  hasTimestamps: true,
  couponControls: function() {
    return this.hasMany(CouponControl);
  },
  isValid : function() {
    return new Promise( (resolve, reject) => {
      let isValid = this.attributes.limit_number > this.relations.couponControls.length;
      if (!isValid)
        return resolve({ isValid: isValid, reason: 'Limite canje alcanzado' });
      
      let date = new Date(this.attributes.limit_date),
          limitDate = date.setDate(date.getDate() + 1);

      if (limitDate < new Date())
        return resolve({ isValid: false, reason: 'Fecha de vencimiento superada'});

      return resolve({ isValid: isValid });
    });
  },
  apply : function(data){
    data.coupon_id = this.id;
    return new CouponControl(data).save(null, {method: 'insert'})
      .then((couponControl) => {
        return couponControl.couponObject()
          .then( (coupon) => {
            return coupon.evaluateFunction(couponControl);
          });
      })
  },
  evaluateFunction: function(couponControl) {
    return {
      apply_discount: (that, couponControl) => {
        return couponControl.orderObject().then((order) => {
          let paymentDetail = order.relations.paymentDetail.attributes;
          if (!paymentDetail)
            return new Promise((resolve) => {
              resolve({message: 'No detalles de pago', error: true});
            });
          let total = paymentDetail.total;
          let discount = parseFloat(that.attributes.discount_value) / 100 * total;
          that.attributes.finalPrice = total - discount;
          return that;
        });
      },
    }[this.attributes.function_name](this, couponControl);
  }
});

module.exports = {
  Coupon : Coupon
};