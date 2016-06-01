/*
 *  Copyright 2016 DS-Cubed
 *
 *  Authored by Sam Mills (Henchman) <sam.mills@hench.space>
 *
 *  Project: dermdb https://dermdb.github.io
 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('jethro');
var favicon = require('serve-favicon');
var routes = require('./routes/index');
var app = express();
var format = require('./middleware/auth/format.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //Uncomment for favicon


app.use(logger.express);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'bower_components')));

app.use(format);
app.use('/', routes);

//Not Found
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

//Error Handler
app.use(function(err, req, res, next) {
    res.status(err.statusCode || 500);
    setTimeout(function() {
        console.error(err.stack);
    }, 500);
    res.render('error', {
        title: "Error - DermDB",
        message: err.message || err.code,
        error: err
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;