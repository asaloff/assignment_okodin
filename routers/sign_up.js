const express = require('express');
const router = express.Router();
const models = require('../models');
const { User } = models;

router.get('/', (req, res) => {
  res.render('sign_up/index', { notLoggedIn: true });
});

router.post('/', (req, res) => {
  userParams = {
    username: req.body.username,
    email: req.body.email
  };

  User.create(userParams)
    .then(user => {
      res.cookie('currentUser', user.id);
      req.flash('success', `Congratulations!, you have signed up successfully. Don't forget to update your profile`);
      res.redirect(`/profiles/${ user.id }`);
    })
    .catch(e => {
      if (e.errors) {
        e.errors.forEach((err) => req.flash('error', err.message));
        res.render('sign_up/index', { notLoggedIn: true });
      } else {
        res.status(500).send(e.stack);
      }
    });
});

module.exports = router;
