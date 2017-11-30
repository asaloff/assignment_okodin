const express = require('express');
const router = express.Router();
const models = require('../models');
const { User, Profile, Location, View } = models;

router.get('/', (req, res) => {
  User.findOne({
    where: {
      id: req.cookies.currentUser
    },
    include: [{
      model: User,
      as: 'Viewed',
      include: [{
        model: Profile,
        include: [{
          model: Location
        }]
      }]
    }, {
      model: User,
      as: 'Views',
      include: [{
        model: Profile,
        include: [{
          model: Location
        }]
      }]
    }],
    order: [
      [ 'Views', View, 'date', 'DESC' ],
      [ 'Viewed', View, 'date', 'DESC' ]
    ]
  })
    .then(user => {
      res.render('views/index', { user });
    })
    .catch(e => {
      res.status(500).send(e.stack);
    });
});

module.exports = router;
