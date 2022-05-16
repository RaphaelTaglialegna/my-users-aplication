"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'users_testapp_db',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    dialectOptions: {
        timezone: 'Z',
    },
    logging: false,
};
module.exports = config;
//# sourceMappingURL=config.js.map