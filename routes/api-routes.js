var db = require("../models");

module.exports = function(app) {

    //GET route for all the potential matches
    app.get("/api/allmatches", function(req, res) {
        db.Users.findAll({}).then(function(results) {
            res.json(results);
        });
    });

    app.post("/api/newuser", function(req, res) {
        console.log(req.body);
        db.Users.create({
            username: req.body.username,
            picture: req.body.picture,
            bio: req.body.bio,
            answers: req.body.answers
        });
    });
};