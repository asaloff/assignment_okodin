const express = require('express');
const router = express.Router();
const searchService = require('../services/search-service');
const models = require('../models');
const { Location } = models;

router.get('/', async (req, res) => {
  let locations = await Location.findAll();

  if (req.query.profile) {
    searchService.findProfiles(req.query)
      .then((results) => {
        let { profiles, queryString } = results;
        res.render('search/index', { profiles, locations, queryString });
      })
      .catch(e => {
        if (e.message) {
          req.flash('error', e.message);
          res.render('search/index', { locations });
        } else {
          res.status(500).send(e.stack);
        }
      });
    } else {
      res.render('search/index', { locations });
    }
});

module.exports = router;
