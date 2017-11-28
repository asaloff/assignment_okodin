const express = require('express');
const router = express.Router();
const models = require('../models');
const { User } = models;
const timeHelper = require('../helpers/timeHelper');

router.get('/new', (req, res) => {
  res.render('sessions/new', { notLoggedIn: true });
});

router.post('/', (req, res) => {
  userParams = getUserParams(req);

  User.find({ where: userParams })
    .then(user => {
      if (!user || !userParams.username || !userParams.email) {
        throw new Error("There was something wrong with your login credentials");
      }

      res.cookie('currentUser', user.id);
      User.update({ lastLogin: timeHelper.getTime() }, { where: { id: user.id } });
      res.redirect(`/profiles/${ user.id }`);
    })
    .catch(e => {
      if (e.message) {
        req.flash('error', e.message);
        res.render('sessions/new', { notLoggedIn: true });
      } else {
        res.status(500).send(e.stack);
      }
    });
});

router.delete('/', (req, res) => {
  res.clearCookie("currentUser");
  res.redirect('/sessions/new');
});

const getUserParams = (req) => {
  return {
    username: req.body.username,
    email: req.body.email
  };
};

module.exports = router;
