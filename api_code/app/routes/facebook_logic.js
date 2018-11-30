const prefix = '/facebook_logic',
  ConversationCode  = require('../models/conversation_code').ConversationCode,
  request = require("request");

module.exports = function(fastify, opts, next){
 

  return next();
};

function processMessage(event){
  let senderID = event.sender.id;
  let message = event.message;

  return ConversationCode.where({message: message.text})
    .fetch().then((conversationCode) => {
      if (!conversationCode)
        return '';

      return conversationCode.setSenderId(senderID);

    });
}
