var path = require("path");

module.exports = function(app) {

    //default profile page (after logging in and/or registering)
    app.get("/profile", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });
}