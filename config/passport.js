var passport = require('passport');
// var GitHubStrategy = require('passport-github2').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
    {
        usernameField: "email"
    },
    function(email, password, done) {
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "incorrect email."
                });
            } else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));


// passport.use(new GitHubStrategy({
//         clientID: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/auth/github/matches"
//     },
//     function(accessToken, refreshToken, profile, done) {
//         console.log(profile);
//         db.User.findOrCreate({ githubId: profile.id }, function(err, user) {
//             return done(err, user);
//         });
//     }
// ));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;






// passport.use(new GitHubStrategy(
//     {
//         usernameField: "email"
//     },
//     function(email, password, done) {
//         db.User.findOne({
//             where: {
//                 email: email
//             }
//         }).then(function(dbUser) {
//             if (!dbUser) {
//                 return done(null, false, {
//                     message: "Incorrect email."
//                 });
//             }
//             else if (!dbUser.validPassword(password)) {
//                 return done(null, false, {
//                     message: "Incorrect password."
//                 });
//             }
//             return done(null, dbUser);
//         });
//     }
// ));














