"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express = require("express");
const UserRoute_1 = require("./routes/UserRoute");
class App {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express.json());
        this.app.use(accessControl);
        this.app.use('/users', UserRoute_1.default);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log('Listening at port', PORT));
    }
}
exports.App = App;
// A execução dos testes de cobertura depende dessa exportação
exports.app = new App().app;
//# sourceMappingURL=app.js.map