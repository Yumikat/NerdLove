require('dotenv').config(); // this is for authentication and has to be first
const express = require('express');
// var passport = require("./config/passport.js");
// const ejs = require('ejs');

const session = require('express-session');
const passport = require('./config/passport');

var PORT = process.env.PORT || 8080;
var db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// app.set('view engine', 'html');

// this keeps track of the user's session
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Listening on localhost:" + PORT);
    });
});








