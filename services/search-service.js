const models = require('../models');
const { User, Profile, Location } = models;
const profileAttributes = require('../lib/profile-attributes');
const heights = profileAttributes.heights();

const SearchService = {};

SearchService.findProfiles = query => {
  return new Promise((resolve, reject) => {
    let queryString = '';
    if (!emptyQuery(query)) queryString += 'Searched for:';

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
    if (gender && gender !== '') {
      profileQuery.where.gender = gender;
      queryString += ` a '${ gender }'`;
    }

    // age query
    if (minAge || maxAge) profileQuery.where.age = {};

    if (minAge) {
      profileQuery.where.age.$gte = minAge;
      queryString += ` minimum age: '${ minAge }'`;
    }

    if (maxAge) {
      profileQuery.where.age.$lte = maxAge;
      queryString += ` maximum age: '${ maxAge }'`;
    }

    // height query
    let minHeightIndex = heights.indexOf(minHeight);
    let maxHeightIndex = heights.indexOf(maxHeight);
    if (minHeight || maxHeight) profileQuery.where.height = {};

    if (minHeight && maxHeight) {
      profileQuery.where.height.$in = heights.slice(minHeightIndex, maxHeightIndex + 1);
      queryString += ` minimum height: '${ minHeight }' maximum height: '${ maxHeight }'`;
    } else if (minHeight) {
      profileQuery.where.height.$in = heights.slice(minHeightIndex);
      queryString += ` minimum height: '${ minHeight }'`;
    } else if (maxHeight) {
      profileQuery.where.height.$in = heights.slice(0, maxHeightIndex + 1);
      queryString += ` maximum height: '${ maxHeight }'`;
    }

    // bodyType query
    let bodyType = query.profile.bodyType;
    if (bodyType && bodyType !== '') {
      profileQuery.where.bodyType = bodyType;
      queryString += ` body type: '${ bodyType }'`;
    }

    // school query
    let school = query.profile.school;
    if (school && school !== '') {
      profileQuery.where.school = school;
      queryString += ` graduated from: '${ school }'`;
    }

    // maxChildren query
    let maxChildren = query.profile.maxChildren;
    if (maxChildren === 0 || maxChildren) {
      profileQuery.where.children = {};
      profileQuery.where.children.$lte = maxChildren;
      queryString += ` maximum children: '${ maxChildren }'`;
    }

    // interest query
    let interest = query.profile.interest;
    if (interest && interest !== '') {
      profileQuery.where.interest = interest;
      queryString += ` interested in: '${ interest }'`;
    }

    // location query
    let distance = parseInt(query.profile.location.distance);
    let city = query.profile.location.city;
    let cityInfo, cityName, cityDistance;

    if (city) {
      cityInfo = query.profile.location.city.split('::');
      cityName = cityInfo[0];
      cityDistance = parseInt(cityInfo[1]);
    }

    if (distance && !city) throw new Error('Distance provided without city');
    if (city && !distance && distance !== 0) throw new Error('City provided without distance');

    if ((distance || distance === 0) && city) {
      profileQuery.include[1].where = {
        distance: {
          $gte: cityDistance - distance,
          $lte: cityDistance + distance
        }
      };
      queryString += ` within ${ distance } miles of '${ cityName }'`;
    }

    // sort by
    let sortBy = query.profile.sort;
    if (sortBy === 'distance') {
      profileQuery.order = [ [ { model: Location }, 'distance', 'ASC'] ];
      queryString += ' sorted by distance';
    }

    if (sortBy === 'age') {
      profileQuery.order = [ ['age', 'ASC'] ];
      queryString += ' sorted by age';
    }

    if (sortBy === 'lastLogin') {
      profileQuery.order = [ [ { model: User }, 'lastLogin', 'DESC'] ];
      queryString += ' sorted by last login';
    }

    Profile.findAll(profileQuery)
      .then(profiles => {
        let results = { profiles, queryString };
        resolve(results);
      });
  });
};

const emptyQuery = (query) => {
  if (query === { "profile": { "minAge": "", "maxAge": "", "location": { "distance": "" } } }) {
    return true;
  } else {
    return false;
  }
};

module.exports = SearchService;
