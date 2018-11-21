const prefix = '/codigos_conversacion',
      ConversationCode = require('../models/conversation_code').ConversationCode;

module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}/:roundsmanId`, (request, response) => {
    ConversationCode.where({roundsman_id: request.params.roundsmanId})
      .fetch({withRelated: ['roundsman']})
      .then(function(conversation){
        return response.send(conversation);
      });
  });

  return next();
};
