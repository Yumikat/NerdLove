module.exports = function(sequelize, DataTypes) {

    var Profile = sequelize.define("Profile", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'https://placem.at/things?w=250&random=some_seed',
            validate: {
                isUrl: true
            }
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        scores: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     isComplete(value) {
            //         if (value.length !== 10) {
            //             throw new Error('There is an answer missing!');
            //         }
            //     }
            // }
        }
    });
    return Profile;
}


// module.exports = function(sequelize, DataTypes) {

//     var Profile = sequelize.define("Profile", {

//         name: DataTypes.STRING,
//         userName: DataTypes.STRING,
//         picture: DataTypes.TEXT,
//         bio: DataTypes.TEXT,
//         gender: DataTypes.STRING,
//         age: DataTypes.INTEGER,
//         answers: DataTypes.STRING,
//         languages: DataTypes.STRING

//     });
//     return Profile;
// }
