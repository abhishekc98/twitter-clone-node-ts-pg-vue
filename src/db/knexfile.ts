import dotenv from 'dotenv';
import knex from "knex"
import { Model } from 'objection';
dotenv.config();
console.log("db url : ", process.env.DATABASE_URL)
const config = {

  client: 'pg',
  connection: process.env.DATABASE_URL || { user:'postgres', password: 'root', database: 'postgres', host: 'localhost', port: 5432},
  migrations: {
    directory: './migrations',
    tableName: 'knex_migration'
  },
  seeds: {
    directory: './seeds'
  }
};


module.exports = config;


