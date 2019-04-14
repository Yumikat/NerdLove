module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        userName: DataTypes.STRING,
        picture: DataTypes.STRING,
        bio: DataTypes.TEXT,
        answers: DataTypes.STRING
    });
    return User;
}