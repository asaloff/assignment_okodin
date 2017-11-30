const models = require('./../models');
const { User, View } = models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // var users = await User.findAll({ limit: 5 });

    // var views = [];

    // for (let user of users) {
    //   for (let viewer of users) {
    //     if (user.id !== viewer.id) {
    //       views.push({
    //         UserId: user.id,
    //         ViewerId: viewer.id
    //       });
    //     }
    //   }
    // }

    // return queryInterface.bulkInsert('Views', views);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Views', null, {}, View);
  }
};
