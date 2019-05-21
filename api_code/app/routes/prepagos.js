const prefix = '/prepagos',
  Prepago = require('../models/prepago').Prepago;
  User = require('../models/user').User;
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
      return Prepago.fetchAll().then(function (prepagos) {
        return response.send(prepagos);
      });
    });
  fastify.post(`${prefix}/cancel_user/:id`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Proceso para activar el prepago de un usuario',
      tags: ['Prepago'],
      summary: 'Activar un usuario',
      body: {
        type: 'object',
        properties: {
          Username: {type: 'string'},
          password: {type: 'string'},
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
    return User.where(request.params).fetch()
      .then((user) => {
        if (!user)
          return response.send({error: 'datos no coinciden'});

        return user.save({ price_rate_id: 4, prepago_active: false, prepago_start_at: null }, { patch: true }).then(function (user) {
          return response.send(user);
        });

      });
  });
  fastify.post(`${prefix}/unactive_user/:id`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Proceso para activar el prepago de un usuario',
      tags: ['Prepago'],
      summary: 'Activar un usuario',
      body: {
        type: 'object',
        properties: {
          Username: {type: 'string'},
          password: {type: 'string'},
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
    return User.where(request.params).fetch()
      .then((user) => {
        if (!user)
          return response.send({error: 'datos no coinciden'});

        return user.save({ prepago_active: false, prepago_start_at: null }, { patch: true }).then(function (user) {
          return response.send(user);
        });

      });
  });
  fastify.post(`${prefix}/active_user/:id`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Proceso para activar el prepago de un usuario',
      tags: ['Prepago'],
      summary: 'Activar un usuario',
      body: {
        type: 'object',
        properties: {
          Username: {type: 'string'},
          password: {type: 'string'},
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
    return User.where(request.params).fetch()
      .then((user) => {
        if (!user)
          return response.send({error: 'datos no coinciden'});

        return user.save({ prepago_active: true, prepago_start_at: new Date() }, { patch: true }).then(function (user) {
          return response.send(user);
        });

      });
  });
  fastify.get(`${prefix}/users_list`,
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
      return Prepago.userLists().then( prepagoList => {
        return response.send(prepagoList);
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
      if (request.query.customValue)
        return PriceRate.createCustom(request.query.customValue).then( priceRate => {
          return response.send(priceRate);
        });

      return PriceRate.where({prepago_id: request.params.prepago_id}).fetch().then(function (priceRate) {
        return response.send(priceRate);
      });
    });

  return next();
}