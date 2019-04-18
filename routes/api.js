"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mwlEntryGenerator_1 = require("../services/mwlEntryGenerator");
const config = require("../config/appConfig");
const router = express.Router();
let list = [];
let lastTime = Date.now();
/* GET home page. */
// noinspection JSUnusedLocalSymbols
router.get("/studies", (req, res, next) => {
    const currentTime = Date.now();
    const elapsedHours = (currentTime - lastTime) / (1000 * 60 * 60);
    lastTime = currentTime;
    const howMany = Math.floor(elapsedHours * config.generator.hourlyPatients);
    const gen = new mwlEntryGenerator_1.MwlEntryGenerator();
    if (howMany && list.length) {
        // Remove first many and push new items
        for (let i = 0; i < howMany; i++) {
            list.shift();
            list.push(gen.generateJson());
        }
    }
    else if (!req.query.limit && list.length) {
    }
    else {
        const limit = req.query.limit || config.generator.defaultMax;
        for (let i = 0; i < limit; i++) {
            list.push(gen.generateJson());
        }
    }
    res.status(200).json(list);
});
router.get("/departments", (req, res, next) => {
    res.status(200).json(config.departments);
});
module.exports = router;
//# sourceMappingURL=api.js.map