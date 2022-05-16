"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_status_codes_1 = require("http-status-codes");
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send('Express + TypeScript');
});
exports.default = app;
//# sourceMappingURL=app.js.map