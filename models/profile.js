module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    UserId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER,
    img: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    sex: {
      type: DataTypes.STRING
    },
    relationshipStatus: {
      type: DataTypes.STRING
    },
    height: {
      type: DataTypes.STRING
    },
    bodyType: {
      type: DataTypes.STRING
    },
    schooling: {
      type: DataTypes.STRING
    },
    children: {
      type: DataTypes.INTEGER
    },
    interest: {
      type: DataTypes.STRING
    },
    about: {
      type: DataTypes.TEXT
    },
    talents: {
      type: DataTypes.TEXT
    },
    favoriteThings: {
      type: DataTypes.TEXT
    },
    messageReason: {
      type: DataTypes.TEXT
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Profile;
};
