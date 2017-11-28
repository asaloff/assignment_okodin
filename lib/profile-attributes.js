const ProfileAttributes = {};

ProfileAttributes.heights = () => {
  var heights = [];
  for (var f = 4; f < 9; f++) {
    for (var i = 0; i < 12; i++) {
      heights.push(`${ f }' ${i}"`);
    }
  }
  return heights;
};

module.exports = ProfileAttributes;
