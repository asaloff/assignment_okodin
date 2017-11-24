const models = require('./../models');
const User = models.User;

module.exports = {
  up: (queryInterface, Sequelize) => {
    var names = ["Astrid", "Brynhild", "Freydis", "Gudrun", "Gunnhild", "Gunnvor", "Hilde", "Ragnhild", "Ranveig", "Sigrid", "Sigrunn", "Siv", "Solveig", "Svanhild", "Torhild", "Torunn", "Turid", "Vigdis", "Yngvild", "Arne", "Eirik", "Geir", "Gunnar", "Harald", "Håkon", "Inge", "Ivar", "Knut", "Leif", "Magnus", "Olav", "Rolf", "Sigurd", "Snorre", "Steinar", "Torstein", "Trygve", "Ulf", "Valdemar", "Vidar", "Yngve"];

    var users = [];

    for (let name of names) {
      users.push({
        username: `${ name }`,
        email: `${ name }@example.com`
      });
    }
    return queryInterface.bulkInsert('Users', users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {}, User);
  }
};
