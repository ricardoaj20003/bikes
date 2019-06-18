
exports.seed = function(knex, Promise) {
  return knex('facebook_conversation_logics').del()
      .then(function () {
        return knex('facebook_conversation_logics').insert([
          {id: 1, request: 'Hola buenos días', response: 'Hola buen día cual su ID', function_name: ''},
          {id: 2, request: 'Claro es el $-', response: 'Listo $xName$ me puedes indicar tu código diario', function_name: 'getmeCode'},
          {id: 3, request: 'Si es $-', response: 'Quedaste activado', function_name: 'registerRoundsman'}
        ]).then( () => {
          return knex('prepagos').del()
            .then(function () {
              return knex('prepagos').insert([
                {id: 1, price: 500.00, orders: 25.00},
                {id: 2, price: 900.00, orders: 60.00}
              ]);
            }).then( () => {
              return knex('price_rates').del()
                .then(function () {
                  return knex('price_rates').insert([
                    {id: 1, distance: 6000.00, price: 35.00, unit_price: 5.00, unit_distance: 1000.00, prepago_id:  null},
                    {id: 2, distance: 15000.00, price: 35.00, unit_price: 5.00, unit_distance: 1000.00, prepago_id:  null},
                    {id: 3, distance: 15000.00, price: 25.00, unit_price: 5.00, unit_distance: 1000.00, prepago_id:  null},
                    {id: 4, distance: 15000.00, price: 20.00, unit_price: 4.50, unit_distance: 1000.00, prepago_id:  1},
                    {id: 5, distance: 15000.00, price: 15.00, unit_price: 4.50, unit_distance: 1000.00, prepago_id:  2}
                  ]);
                }).then( () => {
                  return knex('coupons').del()
                    .then(function () {
                      return knex('coupons').insert([
                        {id: 1, code: 'FREEDMA19', limit_number: 100, limit_date: '2019-08-30', function_name: 'apply_discount', discount_value: 100, message_note: 'Pedido sin cobro', remove_message: 'Precio:'},
                        {id: 2, code: 'TOTESTNOVALID', limit_number: -1, limit_date: '2019-08-30', function_name: 'apply_discount', discount_value: 100, message_note: 'Pedido sin cobro', remove_message: 'Precio:'},
                      ]);
                    }).then( () => {
                      return knex('users').del()
                        .then(function () {
                          return knex('users').insert([
                            {id: 1, username: 'normalusernologin', password: '$2b$08$kKZRSfJtWSBMJJ6cR2EqWOZILAfoERoNop4wxZmI3mDJRtrCjFYiS', email: 'donmandonmx@gmail.com', price_rate_id: 1, phone: '', name: 'Dm boot user', is_admin: false}
                          ]);
                      });
                    });
                });
            })
        });
      });
};
