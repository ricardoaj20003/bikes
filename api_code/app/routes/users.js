require('dotenv').config();
const prefix = '/users',
      jwt = require('jsonwebtoken'),
      User = require('../models/user').User;

module.exports = function(fastify, opts, next){
  fastify.post(`${prefix}`, (request, response) => {
    return response.send({});

    return new User({username: 'donmandon', password: '12345678', email: 'ohcl87@hotmail.com'}).save()
      .then(function (user) {
        return response.send(user);
      })
      .catch(function (err) {
        return response.send(err);
      });
  });

  fastify.post(`${prefix}/sign_in`, (request, response) => {
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
