const models = require('../models');
const { sequelize, User, Profile } = models;

const ProfileUpdater = {};

ProfileUpdater.update = (user, body) => {
  const userParams = {
    username: body.user.username,
    email: body.user.body
  };

  const profileParams = {
    LocationId: body.user.profile.LocationId,
    age: body.user.profile.age,
    location: body.user.profile.location,
    gender: body.user.profile.gender,
    relationshipStatus: body.user.profile.relationshipStatus,
    height: body.user.profile.height,
    bodyType: body.user.profile.bodyType,
    school: body.user.profile.school,
    children: body.user.profile.children,
    interest: body.user.profile.interest,
    about: body.user.profile.about,
    talents: body.user.profile.talents,
    favoriteThings: body.user.profile.favoriteThings,
    messageReason: body.user.profile.messageReason
  };

  return new Promise((resolve, reject) => {
    sequelize.transaction(t => {
      return user.updateAttributes(userParams, { transaction: t })
        .then(() => {
          return user.Profile.updateAttributes(profileParams, { transaction: t });
        })
        .then(() => {
          resolve(user.id);
        })
        .catch(e => {
          reject(e);
        });
    });
  });
};

module.exports = ProfileUpdater;
