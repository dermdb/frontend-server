/*
 *  Copyright 2016 DS-Cubed
 *
 *  Authored by Sam Mills (Henchman) <sam.mills@hench.space>
 *
 *  Project: dermdb https://dermdb.github.io
 */

module.exports = function(req, res, next){

    //Check if user is has existed in the database
    if (res.locals.user === null){

        //Redirect user to login page
        res.redirect("/auth/login");
        
    } else {

        //Continue to next middleware function
        next();
    }
};