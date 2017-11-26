$(document).ready(() => {
  const heights = getHeights();
  for (let h of heights) {
    $("select.heights").append($('<option>', {
      value: h,
      text : h
    }));
  }

  const bodyTypes = ["Skinny", "Lean", "Average", "Muscular", "A few extra pounds", "A complete whale"];
  for (let btype of bodyTypes) {
    $("select#bodytype").append($('<option>', {
      value: btype,
      text: btype
    }));
  }

  const cities = getCities();
  for (let city of cities) {
    $("select#city").append($('<option>', {
      value: city,
      text: city
    }));
  }

  const schools = ["Viking U", "Thors Hammer", "University of Narwal", "Odin State"];
  for (let school of schools) {
    $("select#school").append($('<option>', {
      value: school,
      text: school
    }));
  }

  for (var i = 0; i < 11; i++) {
    $("select#children").append($('<option>', {
      value: i,
      text: i
    }));
  }

  const interests = ["Battles lots of evil", "FOOOOD", "Chasing dragons", "Reading by the fire", "Cooking up a nice goat"];
  for (let interest of interests) {
    $("select#interest").append($('<option>', {
      value: interest,
      text: interest
    }));
  }
});

const getHeights = () => {
  var heights = [];
  for (var f = 4; f < 9; f++) {
    for (var i = 0; i < 12; i++) {
      heights.push(`${ f }' ${i}"`);
    }
  }
  return heights;
};

const getCities = () => {
  return [
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
};
