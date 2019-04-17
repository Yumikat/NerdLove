
// need app.get routes for "/", "/login", and "/members"

var path = require('path');
var passport = require('passport');


module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("home");
    })

    app.get("/register", function(req, res) {
        res.render("register");
    })

    app.get("/submit", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/questions.html"));
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



    app.get("/profile", function(req, res) {
        if (req.isAuthenticated()) {
            res.render("profile");
        } else {
            res.redirect("/login")
        }
    });

    app.post("/profile", function(req, res) {

    })


    //default profile page (after logging in and/or registering)
    app.get("/profile", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

}

