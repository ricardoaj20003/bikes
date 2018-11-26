const prefix = '/codigos_conversacion',
      ConversationCode = require('../models/conversation_code').ConversationCode;

module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}/:roundsmanId`, 
  {
    schema: {
      description: 'Relaciona el id del repartidor con el codigo de pedido',
      tags: ['Codigo de pedido'],
      summary: 'Relaciona el codigo de pedido con el id del repartidor',
      description: 'Relaciona el codigo de pedido con el id del repartidor',
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  },
  (request, response) => {
    return ConversationCode.where({roundsman_id: request.params.roundsmanId})
      .fetch().then(function(conversation){
        return response.send({'message': conversation.attributes.message});
      });
  });

  return next();
};
