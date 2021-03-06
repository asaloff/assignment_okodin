const models = require('./../models');
const { Location, User, Profile } = models;
const profileAttributes = require('../lib/profile-attributes');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var users = await User.findAll();

    var profiles = [];
    var genders = ["male", "female"];
    var relationshipStatuses = ["single", "in a relationship", "married"];

    var heights = profileAttributes.heights();

    var bodyTypes = ["Skinny", "Lean", "Average", "Muscular", "A few extra pounds", "A complete whale"];
    var schools = ["Viking U", "Thors Hammer", "University of Narwal", "Odin State"];
    var interests = ["Battles lots of evil", "FOOOOD", "Chasing dragons", "Reading by the fire", "Cooking up a nice goat"];

    for (let user of users) {
      let gender = genders[Math.floor(Math.random() * genders.length)];
      profiles.push({
        UserId: user.id,
        LocationId: Math.floor(Math.random() * 24) + 1,
        img: `/img/viking_${ gender }.jpg`,
        age: Math.floor(Math.random() * 120) + 1,
        gender: gender,
        relationshipStatus: relationshipStatuses[Math.floor(Math.random() * relationshipStatuses.length)],
        height: heights[Math.floor(Math.random() * heights.length)],
        bodyType: bodyTypes[Math.floor(Math.random() * bodyTypes.length)],
        school: schools[Math.floor(Math.random() * schools.length)],
        children: Math.floor(Math.random() * 10),
        interest: interests[Math.floor(Math.random() * interests.length)],
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        talents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        favoriteThings: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        messageReason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      });
    }

    return queryInterface.bulkInsert('Profiles', profiles);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profiles', null, {}, Profile);
  }
};
