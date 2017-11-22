const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('profiles/index');
});

module.exports = router;
