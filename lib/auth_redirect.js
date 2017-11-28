const models = require('../models');
const { User, Profile, Location } = models;

const AuthRedirection = (req, res, next) => {

  var userId = req.cookies.currentUser;

  User.findById(userId)
    .then(user => {
      // set currentUser for views
      res.locals.currentUser = user;

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
        res.redirect(`/profiles/${ user.id }`);
      } else {
        next();
      }
    });
};

module.exports = AuthRedirection;
