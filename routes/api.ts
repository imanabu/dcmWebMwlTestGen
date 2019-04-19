import _ from "lodash/fp";
import {NextFunction, Request, Response} from "express";
import express = require("express");
import {MwlEntryGenerator} from "../services/mwlEntryGenerator";
import config = require("../config/appConfig");

const router = express.Router();

let list: any[]= [];
let lastGeneratedAt = Date.now();
let previousLimit = 0;

/* GET home page. */
// noinspection JSUnusedLocalSymbols
router.get("/studies", (req: Request, res: Response, next: NextFunction) => {

    const currentTime = Date.now();
    const elapsedHours = (currentTime - lastGeneratedAt)/(1000*60*60);
    let limit = req.query.limit;
    const hourlyPatients = req.query.hourly || config.generator.hourlyPatients;
    config.generator.hourlyPatients = hourlyPatients;

    const howMany = Math.floor(elapsedHours * hourlyPatients);

    const gen = new MwlEntryGenerator();

    if (!limit && howMany && list.length) {
        // Remove first many and push new items
        for(let i = 0; i < howMany; i++) {
            list.shift();
            list.push(gen.generateJson());
        }
        lastGeneratedAt = currentTime;
    } else if (limit){
        if (previousLimit > limit) {
            // If the limit changes to less, reduce the size
            for (let j = 0; j < previousLimit - limit; j++) {
                list.shift();
            }
        }
        config.generator.defaultMax = limit || config.generator.defaultMax;
        list = [];
        for(let i = 0; i < limit; i++) {
            list.push(gen.generateJson());
        }
        previousLimit = limit;
    } else if (!list.length) {
        for(let i = 0; i <  config.generator.defaultMax; i++) {
            list.push(gen.generateJson());
        }
    }

    let result = _.sortBy((x) => {
        return [x["00100010"].Value[0].Alphabetic];
    })(list);

    res.status(200).json(result);
});

router.get("/departments", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(config.departments);
});


module.exports = router;
