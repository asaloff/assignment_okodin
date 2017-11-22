const User = require('../models').User;

const AuthRedirection = (req, res, next) => {

  var userId = req.cookies.currentUser;

  User.findById(userId)
    .then(user => {
      if (!user &&
          !req.url.startsWith('/sessions') &&
          req.url !== '/' &&
          req.url !== '/sign_up')
      {
        res.redirect('/');
      } else if (
        user &&
        (
          (req.url.startsWith('/sessions') && req.method !== 'DELETE') ||
          req.url === '/' ||
          req.url === '/sign_up')
        )
      {
        res.redirect('/profiles');
      } else {
        next();
      }
    });
};

module.exports = AuthRedirection;
