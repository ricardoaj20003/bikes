const config = require('./base'),
      Order    = require('./order').Order,
      ConversationCode  = require('./conversation_code').ConversationCode,
      bookshelf = require('bookshelf')(config.knex);

let Roundsman = bookshelf.Model.extend({
  tableName: 'roundsman',
  hasTimestamps: true,
  conversation_code: function(){
    return this.hasOne(ConversationCode);
  }
});

module.exports = {
  Roundsman : Roundsman
};
