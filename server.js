require('dotenv').config(); // this is for authentication and has to be first
const express = require('express');
// var passport = require("./config/passport.js");
const ejs = require('ejs');

const session = require('express-session');
const passport = require('./config/passport');

var PORT = process.env.PORT || 3000;
var db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.set('view engine', 'ejs');

// this keeps track of the user's session
app.use(session({ secret: "keyboard kittens", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on localhost:" + PORT);
    });
});








