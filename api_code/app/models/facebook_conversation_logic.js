const config = require('./base'),
      request = require("request"),
      Roundsman = require('../models/roundsman').Roundsman,
      ConversationCode  = require('../models/conversation_code').ConversationCode,
      bookshelf = require('bookshelf')(config.knex);

let FacebookConversationLogic = bookshelf.Model.extend({
  tableName: 'facebook_conversation_logics',
  evaluateMessage: function(senderId, message){
    let functionName = this.attributes.function_name;
    if (functionName)
      return this.evaluateFunction(senderId, message).then((returnMessage) => {
        return this.sendMessage(returnMessage, senderId);
      });
    
    return this.sendMessage(this.attributes.response, senderId);
  },
  sendMessage: function(message, senderId){
    let requestBody = {
      "recipient": {
        "id": senderId
      },
      "message": {
        "text":  message
      }
    };

    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": requestBody
    }, (err, res, body) => {
      if (!err) {
        console.log('Mensaje enviado!');
      } else {
        console.error("No se puedo enviar el mensaje:" + err);
      }
    });
  },
  evaluateFunction: function(senderId, message){
    return {
      getmeCode: function(that, message){
        let roundsmanId = message.replace('Claro es el $-','');
        if (isNaN(roundsmanId) || roundsmanId.length === 0)
	  return new Promise((resolve, reject) => {
	    return resolve('Es un placer atenderte');
          });
       
	return Roundsman.where({id: roundsmanId}).fetch().then((roundsman) => {
	  if (roundsman)
	    return that.attributes.response.replace('$xName$', roundsman.attributes.name);
          
	  return 'Es un placer atenderte';
        });
      },
      registerRoundsman: function(that, message, senderId){
        let codeMessage = message.replace('Si es $-','')
	return ConversationCode.where({message: codeMessage})
	  .fetch().then((conversationCode) => {
	     if (!conversationCode)
	       return 'Es un placer atenderte';

	      return conversationCode.setSenderId(senderId);

	    });
      }
    }[this.attributes.function_name](this, message, senderId);
  }
});

module.exports = {
  FacebookConversationLogic : FacebookConversationLogic
};
