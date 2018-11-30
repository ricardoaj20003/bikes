const prefix = '/facebook_logic',
  ConversationCode  = require('../models/conversation_code').ConversationCode,
  request = require("request");

module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: '',
      tags: ['Facebook'],
      summary: 'Ruta a modo de prueba',
      params: {
        type: 'object',
        properties: {
                 }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
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
    }
  },
    (request, response) => {
      response.send({});
    });

  fastify.get(`${prefix}/webhook`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'ruta para comprobar funcionamiento de logica de FB',
      tags: ['Facebook'],
      summary: 'ruta para comprobar funcionamiento de logica de FB',
      params: {
        type: 'object',
        properties: {
         
        }
      },
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {

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
    }
  },
    (request, response) => {
      if (request.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
        return response.code(200).send(request.query["hub.challenge"]);
      } else {
        return response
          .code(403)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send({ message: '"La verificacion ha fallado, porque los tokens no coinciden"' });
      }
    });

  fastify.post(`${prefix}/webhook`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      body:{
      description: 'Compara la valides del token',
      tags: ['Facebook'],
      summary: 'ruta para comprobar funcionamiento de logica de FB',
      params: {
        type: 'object',
        properties: {
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
      if (request.body.object === "page") {
        request.body.entry.forEach(function(entry) {
          entry.messaging.forEach(function(event) {
            if (event.message) {
              processMessage(event);
            }
          });
        });
        return response.code(200).send('EVENT_RECEIVED');
      }

      return response.code(404).send();
    });

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
