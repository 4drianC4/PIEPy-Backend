require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.NAMEDB,
    host: process.env.HOSTDB,
    port: process.env.PORTDB,
    dialect: 'postgres',
  },
  test: {
    username: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.NAMEDB,
    host: process.env.HOSTDB,
    port: process.env.PORTDB,
    dialect: 'postgres',
  },
  production: {
    username: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.NAMEDB,
    host: process.env.HOSTDB,
    port: process.env.PORTDB,
    dialect: 'postgres',
  },
};