
// need app.get routes for "/", "/login", and "/members"

var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {

    app.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/questions")
        }
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/questions", function(req, res) {
        
        res.sendFile(path.join(__dirname, "../public/questions.html"));
    });
    app.get("/login", function(req, res) {
        if (req.user) {
            res.redirect("/questions");
        }
        res.sendFile(path.join(__dirname, "../public/members.html"))
    });

};












