import {Application} from "express";
import config = require("./config/appConfig");
import express = require("express");
import slowDown = require("express-slow-down");
import path = require("path");
const cookieParser: any = require("cookie-parser");
const lessMiddleware: any = require("less-middleware");
import logger = require("morgan");
const isProduction = process.env.NODE_ENV === "production";

const indexRouter: Application = require("./routes");

const app = express();

const speedLimiter = slowDown(config.speedLimit);

app.enable("trust proxy");
app.use(speedLimiter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

/// Error handlers & middle-wares
if (!isProduction) {
  // noinspection JSUnusedLocalSymbols
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        error: err,
        message: err.message,
      },
    });
  });
}

// noinspection JSUnusedLocalSymbols
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      error: {},
      message: err.message,
    },
  });
});


module.exports = app;
