module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: DataTypes.STRING,
        picture: DataTypes.STRING,
        bio: DataTypes.TEXT,
        answers: DataTypes.STRING
    });
    return User;
}