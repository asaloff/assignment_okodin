'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    LikerId: DataTypes.INTEGER,
    LikedId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Like;
};
