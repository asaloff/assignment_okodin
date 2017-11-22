const models = require('./../models');
const User = models.User;

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        username: `foobar${ i }`,
        email: `foobar${ i }@gmail.com`
      });
    }
    return queryInterface.bulkInsert('Users', users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {}, User);
  }
};
