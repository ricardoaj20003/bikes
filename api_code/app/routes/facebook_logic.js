const prefix = '/facebook_logic',
      request = require("request");

module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`, (request, response) => {
    response.send({});
  });

  fastify.get(`${prefix}/webhook`, (request, response) => {
     if (request.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
        response.code(200).send(req.query["hub.challenge"]);
    } else {
      return response
        .code(403)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: '"La verificacion ha fallado, porque los tokens no coinciden"' });
    }
  });

  fastify.post(`${prefix}/webhook`, (request, response) => {
    if (request.body.object === "page") {
        request.body.entry.forEach(function(entry) {
            entry.messaging.forEach(function(event) {
                if (event.message) {
                    process_event(event);
                }
            });
        });
        return response.code(200).send();
    }

    return response.code(200).send();
  });

  return next();
};

function process_event(event){
  var senderID = event.sender.id;
  var message = event.message;

  if(message.text){
    let responseMessage = {
      "text": 'Enviaste este mensaje: ' + message.text
    };
  }

  send_message(senderID, responseMessage);
}

function send_message(senderID, response){
  let request_body = {
    "recipient": {
      "id": senderID
    },
    "message": response
  };

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('Mensaje enviado!');
    } else {
      console.error("No se puedo enviar el mensaje:" + err);
    }
  });
}
