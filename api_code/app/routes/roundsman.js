const prefix            = '/repartidores',
      Roundsman         = require('../models/roundsman').Roundsman,
      ConversationCode  = require('../models/conversation_code').ConversationCode;

module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`, 
  {
    schema: {
      description: ' Codigo para el repartidor.',
      tags: ['Repartidores'],
      summary: 'Devuelve el codigo al repartidor',
      description: 'Entrega el codigo al repartidor',
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
    Roundsman.fetchAll({withRelated: ['conversation_code']}).then(function(roundsmans){
      return response.send(roundsmans);
    });
  });

  fastify.post(`${prefix}`, 
  {
    schema: {
      description: 'Relaciona el codigo con el id del repartidor',
      tags: ['Repartidores'],
      summary: 'Vincula el codigo con el repartidor',
      body: {
        type: 'object',
        properties: {
          nombre: {
            type: 'string',
            description: 'Nombre del repartidor'
          },
          email: {
            type: 'string',
            description: 'Correo electronico del repartidor'
          },
          celular: {
            type: 'number',
            description: 'Numero de celular del repartidor'
          },
          zone_code: {
            type: 'number',
            description: 'Codigo postal'
          }
        }
      },
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

  fastify.get(`${prefix}/:id/conversation_code`,
  {
    schema: {
      description: 'Relaciona el codigo con el repartidor',
      tags: ['Repartidores'],
      summary: 'Relaciona el codigo de pedido con el repartidor',
      description: 'Relaciona el codigo de pedido con el repartidor',
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
    return Roundsman.where({id: request.params.id})
      .fetch({withRelated: ['conversation_code']})
      .then((roundsman) => {
        return response.send(roundsman.relations.conversation_code);
      });
  });

  fastify.post(`${prefix}/:id/refresh_code`,
  {
    schema: {
      description: 'Relaciona el codigo con el id del repartidor',
      tags: ['Repartidores'],
      summary: 'Vincula el codigo con el repartidor',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'ID del repartidor'
          }
        }
      },
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
    Roundsman.where({id: request.params.id}).fetch({withRelated: ['conversation_code']}).then((roundsman) => {
      roundsman.updateCode().then((conversation_code) => {
        return response.send(conversation_code);
      });
    });
  });

  return next();
};
