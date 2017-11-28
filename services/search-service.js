const models = require('../models');
const { User, Profile, Location } = models;
const profileAttributes = require('../lib/profile-attributes');
const heights = profileAttributes.heights();

const SearchService = {};

SearchService.findProfiles = query => {
  return new Promise((resolve, reject) => {
    let profileQuery = {};
    profileQuery.where = {};

    // include User model
    profileQuery.include = [{ model: User }, { model: Location }];

    let minAge = query.profile.minAge;
    let maxAge = query.profile.maxAge;
    let minHeight = query.profile.minHeight;
    let maxHeight = query.profile.maxHeight;

    if (minAge && maxAge && minAge > maxAge){
      throw new Error('Minimum age cannot be greater than maximum age');
    }

    if (minHeight && maxHeight && heights.indexOf(minHeight) > heights.indexOf(maxHeight)) {
      throw new Error('Minimum height cannot be greater than maximum height');
    }

    // gender query
    let gender = query.profile.gender;
    if (gender && gender !== '') profileQuery.where.gender = gender;

    // age query
    if (minAge || maxAge) profileQuery.where.age = {};
    if (minAge) profileQuery.where.age.$gte = minAge;
    if (maxAge) profileQuery.where.age.$lte = maxAge;

    // height query
    let minHeightIndex = heights.indexOf(minHeight);
    let maxHeightIndex = heights.indexOf(maxHeight);
    if (minHeight || maxHeight) profileQuery.where.height = {};

    if (minHeight && maxHeight) {
      profileQuery.where.height.$in = heights.slice(minHeightIndex, maxHeightIndex + 1);
    } else if (minHeight) {
      profileQuery.where.height.$in = heights.slice(minHeightIndex);
    } else if (maxHeight) {
      profileQuery.where.height.$in = heights.slice(0, maxHeightIndex + 1);
    }

    // bodyType query
    let bodyType = query.profile.bodyType;
    if (bodyType && bodyType !== '') profileQuery.where.bodyType = bodyType;

    // school query
    let school = query.profile.school;
    if (school && school !== '') profileQuery.where.school = school;

    // maxChildren query
    let maxChildren = query.profile.maxChildren;
    if (maxChildren === 0 || maxChildren) {
      profileQuery.where.children = {};
      profileQuery.where.children.$lte = maxChildren;
    }

    // interest query
    let interest = query.profile.interest;
    if (interest && interest !== '') profileQuery.where.interest = interest;

    // location query
    let distance = parseInt(query.profile.location.distance);
    let city = parseInt(query.profile.location.city);

    if (distance && !city) throw new Error('Distance provided without city');
    if (city && !distance) throw new Error('City provided without distance');

    if (distance && city) {
      profileQuery.include[1].where = {
        distance: {
          $gte: city - distance,
          $lte: city + distance
        }
      };
    }

    // sort by
    let sortBy = query.profile.sort;
    if (sortBy === 'distance') profileQuery.order = [ [ { model: Location }, 'distance', 'ASC'] ];
    if (sortBy === 'age') profileQuery.order = [ ['age', 'ASC'] ];
    if (sortBy === 'lastLogin') profileQuery.order = [ [ { model: User }, 'lastLogin', 'DESC'] ];

    Profile.findAll(profileQuery)
      .then(profiles => {
        resolve(profiles);
      });
  });
};

module.exports = SearchService;
