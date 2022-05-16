"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app_1 = require("./app");
const PORT = process.env.PORT || 5432;
app_1.default.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
//# sourceMappingURL=server.js.map