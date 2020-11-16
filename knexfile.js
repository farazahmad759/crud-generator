// Update with your config settings.
const Knex = require('knex');
let development_local = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    database: 'blogposts_v1',
    user: 'root',
    password: '',
  },
  migrations: {
    directory: __dirname + '/db/migrations',
  },
  seeds: {
    directory: __dirname + '/db/seeds/development',
  },
};
let development_remote = {
  client: 'mysql',
  connection: {
    host: '198.199.88.57',
    database: 'blogposts_v1',
    user: 'admin',
    password: '9c7bddbcfe94c3e9dbb2139fba2fef1123913a8703db7f7d',
  },
  migrations: {
    directory: __dirname + '/db/migrations',
  },
  seeds: {
    directory: __dirname + '/db/seeds/development',
  },
};

var knexConfig = {
  development:
    process.env.NEXT_PUBLIC_ENV == 'remote'
      ? development_remote
      : development_local,
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds/staging',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds/production',
    },
  },
};
var knex = Knex(knexConfig.development);

exports.knex = knex;
exports.knexConfig = knexConfig;
exports.default = knexConfig;
