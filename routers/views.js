const express = require('express');
const router = express.Router();
const models = require('../models');
const { User, Profile, Location, View } = models;
const SearchService = require('../services/search-service');

router.get('/', (req, res) => {
  SearchService.findUserWithViewInfo(req.cookies.currentUser)
    .then(user => {
      res.render('views/index', { user });
    })
    .catch(e => {
      res.status(500).send(e.stack);
    });
});

module.exports = router;
