
var db = require('../models');
var passport = require('../config/passport');
// the below gets our database of answers
var usersData = require('../db')


// gets User from ../models/users.js


module.exports = function (app) {

    //GET route for all the potential matches
    app.get("/api/allmatches", function (req, res) {
        db.Users.findAll({}).then(function (results) {
            res.json(results);
            // think inside bracket should just be "res.json(usersData)"
        });
    });

    // ***this route contains the logic for matching***
    app.post("/api/allmatches", function (req, res) {
        var newUser = req.body;

        //Loop through newUser scores and convert 
        //"1 (Strongly Disagree)" and "5 (Strongly Agree)" to 1 and 5 respectively
        newUser.answers.forEach(function (score) {
            if (score.answers == "1 (Strongly Disagree)") {
                score.answers = 1;
            }
            else if (score.answers == "5 (Strongly Agree)") {
                score.answers = 5;
            }
            else {
                score.answers = parseInt(score.answers);
            }
        });//End for loop

        //Find Best Match Friend Code Below
        var bestMatch = {};
        var matchedUser = 0;
        //Maximum different score for ten questions is 40 (40 = 10 questions x 4 <different between 5 and 1 choices>). 
        //This number is difference based on number of questions and choices of answers
        var bestMatchedScore = 80;

        //Loop through all friends array
        for (var user = 0; user < usersData.length; user++) {
            var totalScoresDiff = 0;
            //Loop through individual's friend scores
            for (var score = 0; score < usersData[user].scores.length; score++) {
                var diff = Math.abs(usersData[user].scores[score] - newUser.scores[score]);
                totalScoresDiff += diff;
            }//End of inner loop
            //Console log to check if app gives accurate result.
            console.log(totalScoresDiff, usersData[user].name);

            if (totalScoresDiff < bestMatchedScore) {
                matchedUser = user;
                bestMatchedScore = totalScoresDiff;
            }
        }//End of outter loop

        //bestMatch found
        bestMatch = usersData[matchedUser];
        //Push new friend to friends array
        usersData.push(newUser);
        //Return best match friend
        res.json(bestMatch);
    });

    // signing up a new user
    app.post("/api/newuser", function (req, res) {
        console.log(req.body);
        db.Users.create({
            username: req.body.username,
            picture: req.body.picture,
            bio: req.body.bio,
            answers: req.body.answers
        });
    });

    // this authenticates the user login (this is for an existing user)
    app.post("/api/login", function (req, res) {
        const user = new User({
            username: req.body.username,
            password: req.body.passport
        })

        req.login(user, function (err) {
            if (err) {
                console.log(err)
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/api/matches"); // send a cookie
                });
            }
        });
    });

    // this uses the user input of username and password to authenticate and then send them to the matches page
    //    or if there is an error it sends them back to the register page
    app.post("/api/register", function (req, res) {
        db.User.register({ username: req.body.username }, req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/api/matches"); // send a cookie
                });
            }
        });
    });

    // this logs out the user and redirects to the home page.
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });



}
