let Roundsman = bookshelf.Model.extend({
  tableName: 'roundsman',
  hasTimestamps: true,
  conversation_code: function(){
    return this.hasOne(ConversationCode);
  },
  assign_order: function(){
    this.where({id: 1}).fetch().then((roundsman) => {
      this.sendMessage(roundsman.attributes.senderID);
    });
  },
  updateCode: function(){
    let conversation_code = this.relations.conversation_code;
    conversation_code.createCode();
    return conversation_code.save({
      message: this.relations.conversation_code.attributes.message
    }, {patch: true});
  },
  sendMessage: function(senderID){
    let request_body = {
      "recipient": {
        "id": senderID
      },
      "message": {
        "text":  "Tienes un nuevo pedido"
      }
    };

    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      console.log(body);
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
