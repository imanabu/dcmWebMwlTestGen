import {NextFunction, Request, Response} from "express";
import express = require("express");
import {MwlEntryGenerator} from "../services/mwlEntryGenerator";
import {departments} from "../Confg";
const router = express.Router();

/* GET home page. */
// noinspection JSUnusedLocalSymbols
router.get("/studies", (req: Request, res: Response, next: NextFunction) => {
    const gen = new MwlEntryGenerator();
    const limit = req.query.limit || 10;
    const list: any[]= [];
    for(let i = 0; i < limit; i++) {
        list.push(gen.generateJson());
    }
    res.status(200).json(list);
});

router.get("/departments", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(departments);
});

module.exports = router;
