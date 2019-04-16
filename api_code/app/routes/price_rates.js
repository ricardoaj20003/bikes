const prefix            = '/listado_precios',
      PriceRate         = require('../models/price_rate').PriceRate;

module.exports = function(fastify, opts, next){
  fastify.get(`${prefix}`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: ' Codigo para el repartidor.',
        tags: ['Repartidores'
        ],
        summary: 'Devuelve el codigo al repartidor',
        description: 'Entrega el codigo al repartidor',
        response: {
          201: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              hello: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    (request, response) => {
      PriceRate.fetchAll({withRelated: ['users']}).then(function (price_rates) {
        return response.send(price_rates);
      });
    });
  return next();
};