const prefix = '/codigos_conversacion',
      ConversationCode = require('../models/conversation_code').ConversationCode;

module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}/:roundsmanId`, (request, response) => {
    return ConversationCode.where({roundsman_id: request.params.roundsmanId})
      .fetch().then(function(conversation){
        return response.send({'message': conversation.attributes.message});
      });
  });

  return next();
};
