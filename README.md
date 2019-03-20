# Bikes

Project run with Node.js and clone GIT

### Install API

Start anoter windwows console an run:
```sh
cd api_code
```
Install dependece
```sh
npm install
```

### Create .env file in api_code
obtain configuracion for env file @ricardo

### Create DB
Start and create DB in postgres

### Create knexfile.js in api_code

```sh
require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      charset  : 'utf8'
    },
    pool: { min: 0, max: 7 }
  },

  staging: {
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      charset  : 'utf8'
    },
    pool: { min: 0, max: 7 }
  },

  production: {
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      charset  : 'utf8'
    },
    pool: { min: 0, max: 7 }
  }

};
```

### Install knex in api_code
```sh
npm install knex -g
```
Run migration

```sh
knex migrate:latest
```
### Run project

In API
```sh
node index.js
```

Install dependece (in api ** cd .. **)
```sh
npm install
```

Run node server
```sh
node server.js
```

browser port
```sh
http://localhost:3003
```
