/*
 *  Copyright 2016 DS-Cubed
 *
 *  Authored by Sam Mills (Henchman) <sam.mills@hench.space>
 *
 *  Project: dermdb https://dermdb.github.io
 */

var express = require('express');
var router = express.Router();

router.get('/create', function(req, res, next) {
    if (res.locals.user !== null) {
        res.redirect("/dashboard");
    } else {
        res.render('index', {page: 'create'});
    }
}).get('/email', function(req, res, next) {
    if (res.locals.user !== null) {
        res.render('index', { page: 'email' });
    } else {
        res.redirect("/auth/login");
    }
}).get('/login', function(req, res, next) {
    if (res.locals.user !== null) {
        res.redirect("/dashboard");
    } else {
        res.render('index', {page: 'login'});
    }
}).get('/logout', function(req, res, next) {
    if (res.locals.user !== null) {
        res.render('index', {page: 'logout'});
    } else {
        res.redirect("/auth/login");
    }
});

module.exports = router;