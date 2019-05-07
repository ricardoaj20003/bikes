require('dotenv').config();
const prefix = '/users',
      jwt = require('jsonwebtoken'),
      PriceRate = require('../models/price_rate').PriceRate,
      User = require('../models/user').User;

module.exports = function(fastify, opts, next){
  fastify.post(`${prefix}`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Ruta para crear usuario',
      tags: ['Users'],
      summary: 'Ruta para crear usuarios (aun es a modo de prueba)',
      body: {
        type: 'object',
        properties: {
          username: {type: 'string'},
          password: {type: 'string'},
          email: {type: 'string'},
        },
        required: ['price_rate_id']
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
    return new User(request.body).save()
      .then(function (user) {
        return response.send(user);
      })
      .catch(function (err) {
        return response.send(err);
      });
  });

  fastify.get(`${prefix}/:id`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: ' Codigo para el repartidor.',
      tags: ['Repartidores'],
      summary: 'Devuelve el codigo al repartidor',
      description: 'Entrega el codigo al repartidor',
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string'
            }
          }
        }
      }
    }
  },
  (request, response) => {
    return User.where(request.params).fetch()
      .then(function (user) {
        return response.send(user);
      });
  });

  fastify.get(`${prefix}/:id/pedidos`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Codigo para el repartidor.',
      tags: ['Repartidores'],
      summary: 'Devuelve el codigo al repartidor',
      description: 'Entrega el codigo al repartidor',
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string'
            }
          }
        }
      }
    }
  },
  (request, response) => {
    return User.where(request.params).fetch({withRelated: ['orders']})
      .then(function (user) {
        if (user === null)
          return response.send({error: true, message: 'usuario no valido'});

        return user.ordersWithAllData().then( (orders) => {
          return response.send(orders);
        });
      });
  });

  fastify.get(`${prefix}/:id/price_rate`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: ' Codigo para el repartidor.',
      tags: ['Repartidores'],
      summary: 'Devuelve el codigo al repartidor',
      description: 'Entrega el codigo al repartidor',
      response: {
        201: {
          description: 'Succesful response',
          type: 'object',
          properties: {
            hello: { type: 'string'
            }
          }
        }
      }
    }
  },
  (request, response) => {
    return User.where(request.params).fetch()
      .then(function (user) {
        if (user === null) {
          return PriceRate.where({id: 1}).fetch()
            .then( (priceRate) => {
              return response.send(priceRate);
            });
        }

        return user.priceRateObject().then( (priceRate) => {
          return response.send(priceRate);
        } );
      });
  });

  fastify.post(`${prefix}/sign_in`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Proceso de autenticacion del usuario',
      tags: ['Users'],
      summary: 'Valida usuario',
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
    return User.where({username: request.body.username}).fetch()
      .then((user) => {
        if (!user)
          return response.send({error: 'datos no coinciden'});

        return user.validatePassord(request.body.password).then((validateResponse) => {
          if (!validateResponse)
            return response.send({error: 'datos no coinciden'});

            let token = jwt.sign({
              data: user.attributes
            }, process.env.TOKEN_SECRET, { expiresIn: 24 * 60 * 60 });

          return response.send({token: token});
        });
      });
  });

  return next();
};
