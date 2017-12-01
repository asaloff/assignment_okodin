const express = require('express');
const router = express.Router();
const models = require('../models');
const { User, Profile, Location, Like } = models;
const SearchService = require('../services/search-service');

router.get('/', (req, res) => {
  SearchService.findUserWithLikeInfo(req.cookies.currentUser)
    .then(async (user) => {
      user.mutualLikes = await SearchService.findMutualLikes(user.likes, user.liked);
      res.render('likes/index', user);
    })
    .catch(e => {
      res.status(500).send(e.stack);
    });
});

module.exports = router;
