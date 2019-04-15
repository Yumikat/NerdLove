
var db = require('../models');
var passport = require('../config/passport');
// gets User from ../models/users.js



module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        res.json("/matches");
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/register", function(req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/api/matches");
        }).catch(function(err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });

    // Route for logging user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
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




























// module.exports = function(app) {
//
//     // this allows the user to see the matches page if they're authenticated and if not,
//     //    they are redirected to the login page -- this uses sessions and passport
//     app.get("/matches", function(req, res) {
//         if (req.isAuthenticated()) {
//             res.render("matches");
//         } else {
//             res.redirect("/login")
//         }
//     });
//
//     app.get("/profile", function(req, res) {
//         if (req.isAuthenticated()) {
//             res.render("profile");
//         } else {
//             res.redirect("/login")
//         }
//     });
//
//     // signing up a new user
//     app.post("/api/profile", function(req, res) {
//         console.log(req.body);
//         db.Users.create({
//             username: req.body.username,
//             picture: req.body.picture,
//             bio: req.body.bio,
//             answers: req.body.answers
//         });
//     });
//
//     // this authenticates the user login (this is for an existing user)
//     app.post("/api/login", function(req, res) {
//         const user = new User({
//             username: req.body.username,
//             password: req.body.passport
//         })
//
//         req.login(user, function(err) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 passport.authenticate("local")(req, res, function() {
//                     res.redirect("/api/matches"); // send a cookie
//                 });
//             }
//         });
//     });
//
//     // this uses the user input of username and password to authenticate and then send them to the matches page
//     //    or if there is an error it sends them back to the register page
//     app.post("/api/register", function(req, res) {
//         db.User.create({ email: req.body.email,
//             password: req.body.password
//         }).then(function(err, user) {
//             if (err) {
//                 console.log(err);
//                 res.redirect("/api/register");
//             } else {
//                 passport.authenticate("local")(req,res, function() {
//                     res.redirect("/api/matches"); // send a cookie
//                 });
//             }
//         });
//     });
//
//     app.get("/register", function(req, res) {
//         res.render("register");
//     })
//
//     // this logs out the user and redirects to the home page.
//     app.get("/logout", function(req, res) {
//         req.logout();
//         res.redirect("/");
//     });
//
// }

