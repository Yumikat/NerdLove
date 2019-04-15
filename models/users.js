
const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        userName: DataTypes.STRING,
        picture: DataTypes.STRING,
        bio: DataTypes.TEXT,
        answers: DataTypes.STRING
    });

    // check to see if unhashed password can be compared to hashed password that is stored
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    // this hook runs to automatically has the password with 10 rounds of salt
    User.beforeCreate(function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};



