const { Router } = require('express');

const passport = require('passport');

const router = new Router();

router.post(
  '/sign-up',
  passport.authenticate('local-sign-up', {
    successRedirect: '/private',
    failureRedirect: '/'
  })
);

router.post(
  '/sign-in',
  passport.authenticate('local-sign-in', {
    successRedirect: '/private',
    failureRedirect: '/'
  })
);

router.post('/logout', (req, res, next) => {
  req.logout();
  res.json({});
});

module.exports = router;
