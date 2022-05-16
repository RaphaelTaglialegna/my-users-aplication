import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'users_api',
  host: process.env.HOSTNAME,
  port: Number(process.env.DB_PORT) || 3002,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;

