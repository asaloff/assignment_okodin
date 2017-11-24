const models = require('./../models');
const Location = models.Location;

module.exports = {
  up: (queryInterface, Sequelize) => {
    var cities = [
      "Aalborg",
      "Aarhus",
      "Aggersborg",
      "Alaborg",
      "Alrekstad",
      "Altes Lager",
      "Annagassan",
      "Arklow",
      "Bardy-Świelubie",
      "Berezan Island",
      "Bergen",
      "Birka",
      "Borgeby Castle",
      "Borrering",
      "Brattahlíð",
      "Cape Arkona",
      "Cork",
      "Five Boroughs of the Danelaw",
      "Dierkow",
      "Dorestad",
      "Douglas, Isle of Man",
      "Dublin",
      "Dùn Èistean",
      "Dyrnæs"
    ];

    var locations = [];

    var i = -12;
    for (let city of cities) {
      locations.push({
        distance: `${ i }`,
        city: city
      });
      i++;
    }
    return queryInterface.bulkInsert('Locations', locations);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {}, Location);
  }
};
