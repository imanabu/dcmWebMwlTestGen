import {NextFunction, Request, Response} from "express";
import express = require("express");
const router = express.Router();

/* GET home page. */
// noinspection JSUnusedLocalSymbols
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index.pug', { title: 'Express' });
});

module.exports = router;
