const config = require('./base'),
  bookshelf = require('bookshelf')(config.knex);

let Prepago = bookshelf.Model.extend({
  tableName: 'prepagos',
  priceRate: function () {
    let PriceRate = require('./price_rate').PriceRate;
    return this.hasOne(PriceRate);
  }
}, {
  userLists: function(){
    return this.fetchAll().then( prepagos => {
      let prepagoObjects = {},
        prepagoIds = prepagos.map( prepago => { 
        prepagoObjects[prepago.id] = prepago.attributes;
        return prepago.id 
      });
      let PriceRate = require('./price_rate').PriceRate,
          userLists = {};
      
      Object.assign(userLists, prepagoObjects);
      return PriceRate.where('prepago_id', 'IN', prepagoIds).fetchAll().then( prices => {
        let pricesIds = prices.map( price => { 
          userLists[price.id] = prepagoObjects[price.attributes.prepago_id];
          return price.id 
        });
        let User = require('./user').User;
        return User.where('price_rate_id', 'IN', pricesIds).orderBy('id', 'DESC').fetchAll().then( users => {
          return new Promise( (resolve, reject) => {
            let usersObject = [];
            users.forEach(user => {
              let userObject = user.attributes;
              userObject.prepagoData = userLists[userObject.price_rate_id];
              usersObject.push(userObject);
              resolve(usersObject);
            });
          });
        });
      });
    });
  }
});

module.exports = {
  Prepago : Prepago
};