const express = require('express');

const emojis = require('./emojis');

const router = express.Router();

const auth = require('./auth/auth.routes');

router.use('/auth', auth);

const users = require('./users/users.routes');

router.use('/users', users);

const movie = require('./movie/movie.routes');

router.use('/movie', movie);

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

module.exports = router;
