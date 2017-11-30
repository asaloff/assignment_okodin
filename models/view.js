'use strict';
module.exports = (sequelize, DataTypes) => {
  var View = sequelize.define('View', {
    ViewerId: DataTypes.INTEGER,
    ViewedId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return View;
};
