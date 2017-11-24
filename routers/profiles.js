const express = require('express');
const router = express.Router();
const models = require('../models');
const { User, Profile, Location } = models;

router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    include: [{
      model: Profile,
      include: [{
        model: Location
      }]
    }]
  })
    .then(user => {
      if (!user) throw "User not found";
      res.render('profiles/show', { user });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
