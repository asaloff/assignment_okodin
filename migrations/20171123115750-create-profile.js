'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      LocationId: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      sex: {
        type: Sequelize.STRING
      },
      relationshipStatus: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.STRING
      },
      bodyType: {
        type: Sequelize.STRING
      },
      schooling: {
        type: Sequelize.STRING
      },
      children: {
        type: Sequelize.INTEGER
      },
      interest: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      talents: {
        type: Sequelize.TEXT
      },
      favoriteThings: {
        type: Sequelize.TEXT
      },
      messageReason: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Profiles');
  }
};
