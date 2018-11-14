const pedidos = require('./pedidos.js');

module.exports = {
  pedidos: {
    init_pedido: pedidos.init_pedido(request, response)
  }
};
