import {Application, NextFunction, Request, Response} from "express";
import express = require("express");
import api = require("./api");
const router = express.Router();

router.use("/api", api as Application)

module.exports = router;
