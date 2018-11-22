const config = require('./base'),
      Order    = require('./order').Order,
      ConversationCode  = require('./conversation_code').ConversationCode,
      bookshelf = require('bookshelf')(config.knex);

let Roundsman = bookshelf.Model.extend({
  tableName: 'roundsman',
  hasTimestamps: true,
  conversation_code: function(){
    return this.hasOne(ConversationCode);
  },
  updateCode: function(){
    let conversation_code = this.relations.conversation_code;
    conversation_code.createCode();
    return conversation_code.save({
      message: this.relations.conversation_code.attributes.message
    }, {patch: true});
  }
});

module.exports = {
  Roundsman : Roundsman
};
