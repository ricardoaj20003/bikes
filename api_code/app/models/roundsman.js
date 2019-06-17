const config = require('./base'),
      OrderControl        = require('./order_control').OrderControl,
      ConversationCode  = require('./conversation_code').ConversationCode,
      request = require("request"),
      bookshelf = require('bookshelf')(config.knex);

let Roundsman = bookshelf.Model.extend({
  tableName: 'roundsman',
  hasTimestamps: true,
  order_control: function() {
    return this.hasOne(OrderControl);
  },
  conversation_code: function(){
    return this.hasOne(ConversationCode);
  },
  assign_order: function(message,orderId){
    return this.sendStartMessage(this.attributes.senderID, orderId, message);
  },
  start_order: function(orderId){
    return this.sendCloseMessage(this.attributes.senderID, orderId);
  },
  updateCode: function(){
    let conversation_code = this.relations.conversation_code;
    conversation_code.createCode();
    return conversation_code.save({
      message: this.relations.conversation_code.attributes.message
    }, {patch: true});
  },
  sendCloseMessage: function(senderID, orderId){
    let url = `https://www.donmandon.mx/pedidos/${orderId}/terminar`;
    let requestBody = {
      "recipient": {
        "id": senderID
      },
      "message": {
        "text":  `Pedido iniciado \n Click para cerrar ${url}`
      }
    };
    this.sendMessage(requestBody);
  },
  sendStartMessage: function(senderID, orderId, message){
    let url = `https://www.donmandon.mx/pedidos/${orderId}/iniciar`;
    let requestBody = {
      "recipient": {
        "id": senderID
      },
      "message": {
        "text":  `Tienes un nuevo pedido \n ${message} \n Click para iniciar ${url}`
      }
    };
    this.sendMessage(requestBody);
  },
  sendMessage: function(requestBody){
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": requestBody
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
