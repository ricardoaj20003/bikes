const prefix = '/cupones',
      Coupon = require('../models/coupon').Coupon;

module.exports = function (fastify, opts, next) {
  fastify.get(`${prefix}`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Se dan los copones creados',
        tags: ['Pedidos'],
        summary: 'da todos los cupones',
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
      Coupon.fetchAll().then(function (coupons) {
        return response.send(coupons);
      });
    });
  fastify.get(`${prefix}/:code`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Da información referente a un cupon',
      tags: ['Cupones'],
      summary: 'información cupon',
      params: {
        type: 'object',
        properties: {
          code: {type: 'string'},
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
    return Coupon.where(request.params).fetch()
      .then((coupon) => {
        return response.send(coupon);
      });
  });
  fastify.get(`${prefix}/:code/is_valid`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Valida existencia y vigencia de coupon ',
      tags: ['Cupones'],
      summary: 'Valida un copon',
      params: {
        type: 'object',
        properties: {
          copon: {type: 'string'},
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
    return Coupon.where(request.params).fetch({withRelated: ['couponControls']})
      .then((coupon) => {
        return coupon.isValid(coupon).then((validationObject) => {
          if (!validationObject.isValid)
            return response.send({message: `Cupon no valido ${validationObject.reason}`, invalid: true}).code(403);
          
          return response.send(coupon);
        });
      });
  });
  fastify.post(`${prefix}/:code/apply`,
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Valida existencia y vigencia de coupon ',
      tags: ['Cupones'],
      summary: 'Valida un copon',
      params: {
        type: 'object',
        properties: {
          copon: {type: 'string'},
        }
      },
      body: {
        type: 'object',
        properties: {
          order_id: {type: 'integer'},
          user_id: {type: 'integer'}
        },
        required: ['order_id', 'user_id']
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
    return Coupon.where(request.params).fetch({withRelated: ['couponControls']})
      .then((coupon) => {
        return coupon.isValid().then((validationObject) => {
          if (!validationObject.isValid)
            return response.send({message: `Cupon no valido ${validationObject.reason}`, invalid: true}).code(403);
          
          return coupon.apply(request.body).then((coupon) => {

            return response.send(coupon);
          });
        });
      });
  });
  return next();
};