import {NextFunction, Request, Response} from "express";
import express = require("express");
import {MwlEntryGenerator} from "../services/mwlEntryGenerator";
import config = require("../config/appConfig");

const router = express.Router();

let list: any[]= [];
let lastGeneratedAt = Date.now();

/* GET home page. */
// noinspection JSUnusedLocalSymbols
router.get("/studies", (req: Request, res: Response, next: NextFunction) => {

    const currentTime = Date.now();
    const elapsedHours = (currentTime - lastGeneratedAt)/(1000*60*60);
    const limit = req.query.limit || config.generator.defaultMax;
    const hourlyPatients = req.query.hourly || config.generator.hourlyPatients;
    config.generator.hourlyPatients = hourlyPatients;
    config.generator.defaultMax = limit;

    const howMany = Math.floor(elapsedHours * hourlyPatients);

    const gen = new MwlEntryGenerator();

    if (howMany && list.length) {
        // Remove first many and push new items
        for(let i = 0; i < howMany; i++) {
            list.shift();
            list.push(gen.generateJson());
        }
        lastGeneratedAt = currentTime;
    } else {
        for(let i = 0; i < limit; i++) {
            list.push(gen.generateJson());
        }
    }
    res.status(200).json(list);
});

router.get("/departments", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(config.departments);
});


module.exports = router;
