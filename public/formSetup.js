$(document).ready(() => {
  const heights = getHeights();
  const currentHeight = $("#current-height").text();
  for (let h of heights) {
    $("select.heights").append($('<option>', {
      value: h,
      text : h,
      selected: currentHeight === h
    }));
  }

  const bodyTypes = ["Skinny", "Lean", "Average", "Muscular", "A few extra pounds", "A complete whale"];
  const currentBodyType = $("#current-body-type").text();
  for (let btype of bodyTypes) {
    $("select#bodytype").append($('<option>', {
      value: btype,
      text: btype,
      selected: currentBodyType === btype
    }));
  }

  const schools = ["Viking U", "Thors Hammer", "University of Narwal", "Odin State"];
  const currentSchool = $("#currentSchool").text();
  for (let school of schools) {
    $("select#school").append($('<option>', {
      value: school,
      text: school,
      selected: currentSchool === school
    }));
  }

  const currentChildCount = $("#currentChildCount").text();
  for (var i = 0; i < 11; i++) {
    $("select#children").append($('<option>', {
      value: i,
      text: i,
      selected: parseInt(currentChildCount) === i
    }));
  }

  const interests = ["Battles lots of evil", "FOOOOD", "Chasing dragons", "Reading by the fire", "Cooking up a nice goat"];
  const currentInterest = $("#currentInterest").text();
  for (let interest of interests) {
    $("select#interest").append($('<option>', {
      value: interest,
      text: interest,
      selected: currentInterest === interest
    }));
  }

  const relationshipStatuses = ["single", "in a relationship", "married"];
  const currentStatus = $("#current-status").text();
  for (let status of relationshipStatuses) {
    $("select#status").append($('<option>', {
      value: status,
      text: toTitleCase(status),
      selected: currentStatus === status
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

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
