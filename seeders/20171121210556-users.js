const models = require('./../models');
const User = models.User;

module.exports = {
  up: (queryInterface, Sequelize) => {
    var names = ["Astrid", "Brynhild", "Freydis", "Gudrun", "Gunnhild", "Gunnvor", "Hilde", "Ragnhild", "Ranveig", "Sigrid", "Sigrunn", "Siv", "Solveig", "Svanhild", "Torhild", "Torunn", "Turid", "Vigdis", "Yngvild", "Arne", "Eirik", "Geir", "Gunnar", "Harald", "Håkon", "Inge", "Ivar", "Knut", "Leif", "Magnus", "Olav", "Rolf", "Sigurd", "Snorre", "Steinar", "Torstein", "Trygve", "Ulf", "Valdemar", "Vidar", "Yngve","Shemeka","Aretha","Jennifer","Tonita","Taryn","Adalberto","Jessia","Kathrin","Caroll","Wendell","Orville","Michele","Camie","Milly","Marty","Sunny","Chanda","Bryant","Toshia","Delmy","Boyce","Kelsie","Olga","Wm","Lilian","Tiffaney","Bernetta","Sommer","Camilla","Sheba","Jerald","Solange","Laverne","Rhett","Gerri","Esther","Luba","Stephan","Riley","Kenya","Iva","Elane","Stephania","Karla","Deneen","Jutta","Andre","Kendrick","Karie","Miki","Ela","Arcelia","Chantel","Tammi","Rhea","Nancy","Bert","Nickie","Fleta","Roma","Jodi","Virgilio","Antonetta","Daryl","Deloise","Jeannie","Florine","Ethan","Bernie","Krystin","Rebecca","Sharyl","Flossie","Shanel","Ossie","Tessa","Sheila","Damaris","Adrianne","Ardath","Cherlyn","Zola","Lonna","Lorenzo","Teddy","Joselyn","Granville","Cassidy","Olen","Joy","Tyrell","Muoi","Vaughn","Sheilah","Kristen","Ardith","Janee","Howard","Blossom","Adelle"];

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
