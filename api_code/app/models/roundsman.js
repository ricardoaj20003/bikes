const config = require('./base'),
      Order    = require('./order').Order,
      ConversationCode  = require('./conversation_code').ConversationCode,
      request = require("request"),
      bookshelf = require('bookshelf')(config.knex);

let Roundsman = bookshelf.Model.extend({
  tableName: 'roundsman',
  hasTimestamps: true,
  conversation_code: function(){
    return this.hasOne(ConversationCode);
  },
  assign_order: function(orderId, message){
    return this.where({id: 1}).fetch().then((roundsman) => {
      roundsman.save({order_id: orderId}, {patch: true}).then((roundsman) => {
        this.sendMessage(roundsman.attributes.senderID, roundsman.attributes.order_id, message);
      });
    });
  },
  updateCode: function(){
    let conversation_code = this.relations.conversation_code;
    conversation_code.createCode();
    return conversation_code.save({
      message: this.relations.conversation_code.attributes.message
    }, {patch: true});
  },
  sendMessage: function(senderID, orderId, message){
    let closePedidoUrl = `https://api.donmandon.mx/pedidos/${orderId}/close`;
    let request_body = {
      "recipient": {
        "id": senderID
      },
      "message": {
        "text":  `Tienes un nuevo pedido \n ${message} \n ${closePedidoUrl}`
      }
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
});

module.exports = {
  Roundsman : Roundsman
};
