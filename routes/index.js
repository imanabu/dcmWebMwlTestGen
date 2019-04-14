"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api = require("./api");
const router = express.Router();
router.use("/api", api);
module.exports = router;
//# sourceMappingURL=index.js.map