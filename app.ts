import {Application, NextFunction, Request, Response} from "express";
const createError: any = require("http-errors");
import express = require("express");
import path = require("path");
const cookieParser: any = require("cookie-parser");
const lessMiddleware: any = require("less-middleware");
import logger = require("morgan");

import {ResponseError} from "./interfaces";

const indexRouter: Application = require("./routes");
const usersRouter: Application = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// noinspection JSUnusedLocalSymbols
app.use(function(err: ResponseError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
