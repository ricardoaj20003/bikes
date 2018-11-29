const prefix = '/facebook_logic',
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
            hello: { type: 'string' }
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
            hello: { type: 'string' }
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
                    process_event(event);
                }
            });
        });
        return response.code(200).send('EVENT_RECEIVED');
    }

    return response.code(404).send();
  });

  return next();
};

function process_event(event){
  var senderID = event.sender.id;
  var message = event.message;
  let responseMessage = '';

  if(message.text){
    responseMessage = {
      "text": 'Enviaste este mensaje: ' + message.text
    };
  }

  send_message(senderID, responseMessage);
}

function send_message(senderID, responseMessage){
  let request_body = {
    "recipient": {
      "id": senderID
    },
    "message": responseMessage
  };

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    console.log(res);
    console.log(body);
    if (!err) {
      console.log('Mensaje enviado!');
    } else {
      console.error("No se puedo enviar el mensaje:" + err);
    }
  });
}
