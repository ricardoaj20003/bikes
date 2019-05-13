const prefix = '/prepagos',
  Prepago = require('../models/prepago').Prepago;
  PriceRate = require('../models/price_rate').PriceRate;

module.exports = function (fastify, opts, next) {
  fastify.get(`${prefix}`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Se dan los prepagos creados',
        tags: ['Prepago'],
        summary: 'da todos los prepagos',
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
      Prepago.fetchAll().then(function (prepagos) {
        return response.send(prepagos);
      });
    });
  fastify.get(`${prefix}/:prepago_id`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Se dan los prepagos creados',
        tags: ['Prepago'],
        summary: 'da todos los prepagos',
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
      PriceRate.where({prepago_id: request.params.prepago_id}).fetch().then(function (priceRate) {
        return response.send(priceRate);
      });
    });

  return next();
}