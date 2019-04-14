"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mwlEntryGenerator_1 = require("../services/mwlEntryGenerator");
const Confg_1 = require("../Confg");
const router = express.Router();
/* GET home page. */
// noinspection JSUnusedLocalSymbols
router.get("/studies", (req, res, next) => {
    const gen = new mwlEntryGenerator_1.MwlEntryGenerator();
    const limit = req.query.limit || 10;
    const list = [];
    for (let i = 0; i < limit; i++) {
        list.push(gen.generateJson());
    }
    res.status(200).json(list);
});
router.get("/departments", (req, res, next) => {
    res.status(200).json(Confg_1.departments);
});
module.exports = router;
//# sourceMappingURL=api.js.map