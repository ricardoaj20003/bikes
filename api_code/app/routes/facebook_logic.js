const prefix = '/facebook_logic',
      ConversationCode  = require('../models/conversation_code').ConversationCode,
      request = require("request");

module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`, (request, response) => {
    return response.send({});
  });

  fastify.get(`${prefix}/webhook`, (request, response) => {
     if (request.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
        return response.code(200).send(request.query["hub.challenge"]);
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
                    validateMessage(event);
                }
            });
        });
        return response.code(200).send('EVENT_RECEIVED');
    }

    return response.code(404).send();
  });

  return next();
};

function validateMessage(event){
  let senderID = event.sender.id;
  let message = event.message;

  return ConversationCode.where({message: message})
    .fetch().then((conversationCode) => {
      if (!conversationCode)
        return '';

      return conversationCode.setSenderId(senderID);

    });

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
    if (!err) {
      console.log('Mensaje enviado!');
    } else {
      console.error("No se puedo enviar el mensaje:" + err);
    }
  });
}
