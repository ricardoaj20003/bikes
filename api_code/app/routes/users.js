require('dotenv').config();
const prefix = '/users',
      jwt = require('jsonwebtoken'),
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
