const express = require('express');
const router = express.Router();
const models = require('../models');
const { User, Profile, Location } = models;
const ProfileUpdater = require('../services/profile-update-service');
const ViewHandler = require('../lib/viewHandler');

router.get('/:id', (req, res) => {
    findUser(req.params.id)
    .then(user => {
      if (!user) throw "User not found";

      // check for current user
      var isCurrentUser = checkCurrentUser(req.cookies.currentUser, user.id);

      ViewHandler.createView(req.cookies.currentUser, user.id);

      res.render('profiles/show', { user, isCurrentUser });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/:id/edit', async (req, res) => {
  let locations = await Location.findAll();

  findUser(req.params.id)
  .then(user => {
    if (!user) throw "User not found";

    // check for current user
    var isCurrentUser = checkCurrentUser(res.locals.currentUser.id, user.id);
    if (!isCurrentUser) throw new Error('Cannot edit someone else\'s profile.');

    res.render('profiles/edit', { user, locations });
  })
  .catch(e => {
    var reason;
    e.message ? reason = e.message : reason = e.stack;
    res.status(500).send(reason);
  });
});

router.post('/:id', (req, res) => {
  findUser(req.params.id)
  .then(user => {
    if (!user) throw "User not found";

    // check for current user
    var isCurrentUser = checkCurrentUser(res.locals.currentUser.id, user.id);
    if (!isCurrentUser) throw new Error('Cannot edit someone else\'s profile.');

    return ProfileUpdater.update(user, req.body)
  })
  .then(userId => {
    req.flash('success', "You're profile was updated successsfully");
    res.redirect(`/profiles/${ userId }`);
  })
  .catch(e => {
    if (e.errors) {
      e.errors.forEach((err) => req.flash('error', err.message));
      res.redirect(`/profiles/${ req.params.id }/edit`)
    } else {
      res.status(500).send(e.stack);
    }
  });
});

const findUser = (id) => {
  return User.findOne({
    where: { id: id },
    include: [{
      model: Profile,
      include: [{
        model: Location
      }]
    }]
  });
};

const checkCurrentUser = (currentUserId, userId) => {
  var isCurrentUser;
  currentUserId == userId ? isCurrentUser = true : isCurrentUser = false;
  return isCurrentUser;
};

module.exports = router;
