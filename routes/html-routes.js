
// need app.get routes for "/", "/login", and "/members"

var path = require('path');

module.exports = function(app) {

    //default profile page (after logging in and/or registering)
    app.get("/profile", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });
  
  
      // this authenticates with github login and uses their profile
    app.get("/auth/github",
        passport.authenticate('github', { scope: ["user: email"] }));

    // this sends back to home if login with github fails.
    app.get("/auth/github/matches",
        passport.authenticate("github", { failureRedirect: "/login" }),
        function(req, res) {
            res.redirect("/");
        });
}
