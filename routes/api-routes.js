
var db = require('../models');
var passport = require('../config/passport');
// gets User from ../models/users.js

module.exports = function(app) {
  
  //GET route for all the potential matches
    app.get("/api/allmatches", function(req, res) {
        db.Users.findAll({}).then(function(results) {
            res.json(results);
        });
    });

    // signing up a new user
    app.post("/api/newuser", function(req, res) {
        console.log(req.body);
        db.Users.create({
            username: req.body.username,
            picture: req.body.picture,
            bio: req.body.bio,
            answers: req.body.answers
        });
    });

    // this authenticates the user login (this is for an existing user)
    app.post("/api/login", function(req, res) {
        const user = new User({
            username: req.body.username,
            password: req.body.passport
        })

        req.login(user, function(err) {
            if (err) {
                console.log(err)
            } else {
                passport.authenticate("local")(req, res, function() {
                    res.redirect("/api/matches"); // send a cookie
                });
            }
        });
    });

    // this uses the user input of username and password to authenticate and then send them to the matches page
    //    or if there is an error it sends them back to the register page
    app.post("/api/register", function(req, res) {
        db.User.register({ username: req.body.username}, req.body.password, function(err, user) {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req,res, function() {
                    res.redirect("/api/matches"); // send a cookie
                });
            }
        });
    });

    // this logs out the user and redirects to the home page.
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // this allows the user to see the matches page if they're authenticated and if not,
    //    they are redirected to the login page -- this uses sessions and passport
    app.get("/api/matches", function(req, res) {
        if (req.isAuthenticated()) {
            res.render("matches");
        } else {
            res.redirect("/login")
        }
    });

}

