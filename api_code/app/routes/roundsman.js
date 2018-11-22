const prefix            = '/repartidores',
      Roundsman         = require('../models/roundsman').Roundsman,
      ConversationCode  = require('../models/conversation_code').ConversationCode;

module.exports = function(fastify, opts, next){
  fastify.post(`${prefix}`, (request, response) => {
    return new Roundsman(request.body.roundsman).save()
      .then(function(roundsman){
        return new ConversationCode().save({'roundsman_id': roundsman.id})
          .then(function(conversation){
            return Roundsman.where({id: roundsman.id}).fetch({withRelated: ['conversation_code']})
              .then(function(roundsman){
                return response.send(roundsman);
              });
          });
      });
  });

  fastify.get(`${prefix}/:id/conversation_code`, (request, response) => {
    return Roundsman.where({id: request.params.id})
      .fetch({withRelated: ['conversation_code']})
      .then((roundsman) => {
        return response.send(roundsman.relations.conversation_code);
      });
  });

  fastify.post(`${prefix}/:id/refresh_code`, (request, response) => {
    Roundsman.where({id: request.params.id}).fetch({withRelated: ['conversation_code']}).then((roundsman) => {
      roundsman.updateCode().then((conversation_code) => {
        return response.send(conversation_code);
      });
    });
  });

  return next();
};
