
module.exports = function(sequelize, DataTypes) {

    var Profile = sequelize.define("Profile", {

        name: DataTypes.STRING,
        userName: DataTypes.STRING,
        picture: DataTypes.TEXT,
        bio: DataTypes.TEXT,
        gender: DataTypes.STRING,
        age: DataTypes.INTEGER,
        answers: DataTypes.STRING,
        language:DataTypes.STRING

    });
    return Profile;
}




