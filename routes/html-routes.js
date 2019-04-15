
// need app.get routes for "/", "/login", and "/members"

var path = require('path');
var passport = require('passport');


module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("home");
    })

    app.get("/api/register", function(req, res) {
        res.render("register");
    })

    app.get("/api/login", function(req, res) {
        res.render("login");
    })

    // this authenticates with github login and uses their profile
    app.get("/auth/github",
        passport.authenticate('github', { scope: ["user:email"] }));

    // this sends back to home if login with github fails.
    app.get("/auth/github/matches",
        passport.authenticate("github", { failureRedirect: "/login" }),
        function(req, res) {
            res.redirect("/matches");
        });

    // this allows the user to see the matches page if they're authenticated and if not,
    //    they are redirected to the login page -- this uses sessions and passport
    app.get("/matches", function(req, res) {
        if (req.isAuthenticated()) {
            res.render("matches");
        } else {
            res.redirect("/login")
        }
    });

    app.get("/submit", function(req, res) {
        if (req.isAuthenticated()) {
            res.render("submit");
        } else {
            res.redirect("/login")
        }
    });

    app.post("/submit", function(req, res) {

    })


    //default profile page (after logging in and/or registering)
    app.get("/profile", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

}

