module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name:DataTypes.STRING,
        userName: DataTypes.STRING,
        picture: DataTypes.TEXT,
        bio: DataTypes.TEXT,
        gender: DataTypes.STRING,
        age: DataTypes.INTEGER,
        answers: DataTypes.STRING
    });
    return User;
}

