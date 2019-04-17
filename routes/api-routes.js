
var db = require('../models');
var passport = require('../config/passport');
// the below gets our database of answers


module.exports = function (app) {

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.render("/questions");
    });

    app.get("/api/profiles", function (req, res) {
        db.Profile.findAll().then(function (profiles) {
            res.json(profiles);
        });
    });

    app.post("/api/questions", function (req, res) {
        var newProfile = req.body;
        var newProfileScores = req.body.scores;
        var userData = db.Profile.findAll();
        db.Profile.create({
            name: req.body.name,
            picture: req.body.picture,
            bio: req.body.bio,
            scores: req.body.scores
        }).then(function(results) {
            res.json(results);
        });
    });

        // db.Profile.findAll().then(function (results) {
        //     var matchName = "";
        //     var matchPhoto = "";
        //     var matchBio = "";
        //     var totalDiff = 10000;
        //     for (let i = 0; i < userData.length; i++) {
        //         var currentCompare = 0;
        //         for (let j = 0; j < newProfileScores.length; j++) {
        //             console.log(userData[i].scores);
        //             // compare new score index with each existing score of same index
        //             currentCompare += Math.abs(newProfile.scores[j] - userData[i].scores[j]);
        //         }
        //         // winner is the position of the lowest score difference
        //         if (currentCompare < totalDiff) {
        //             totalDiff = currentCompare;
        //             matchName = userData[i].name;
        //             matchPhoto = userData[i].picture;
        //             matchBio = userData[i].bio
        //         }
        //     }

        //     // put new friend into data storage -- do this at the end so you're not comparing you to yourself.
        //     userData.push(newProfile);

        //     res.json({
        //         status: 'OK',
        //         matchName: matchName,
        //         matchPhoto: matchPhoto,
        //         matchBio: matchBio
        //     });
        // })




    // });



    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.Profile.findAll({}).then(function (tutors) {
            res.json(tutors);
            db.Profile.create({
                name: req.body.name,
                picture: req.body.picture,
                bio: req.body.bio,
                scores: req.body.scores
            });
        })

        // res.json({
        //     matchName:matchName, 
        //     matchImg: matchImg

        // })
    });
    // this authenticates the user login (this is for an existing user)
    app.post("/api/login", function (req, res) {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        }).then(function () {
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            res.json(err);
        });
    });


    // this logs out the user and redirects to the home page.
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

};




















