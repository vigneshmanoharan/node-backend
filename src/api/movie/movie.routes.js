const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  // eslint-disable-next-line max-len
  findMovieList, createMovie, findMovieByMovieName, findMovieByMovieId, deleteMovieById, updateMovie,
} = require('./movie.services');

const router = express.Router();

// List movie API
router.get('/list', isAuthenticated, async (req, res, next) => {
  try {
    const movieList = await findMovieList();
    res.json(movieList);
  } catch (err) {
    next(err);
  }
});
// Add new movie API
router.post('/addMovie', isAuthenticated, async (req, res, next) => {
  try {
    const {
      movieName, rating, userId, cast, releaseDate,
    } = req.body;
    if (!movieName || !rating || !userId || !cast || !releaseDate) {
      res.status(400);
      throw new Error('Required Parameters are missing');
    }

    const duplicateMovieCheck = await findMovieByMovieName(movieName);

    if (duplicateMovieCheck) {
      res.status(409);
      throw new Error('Movie Already Exists');
    }

    const movie = await createMovie({
      movieName, rating, userId, cast, releaseDate,
    });

    res.json({
      movie,
    });
  } catch (err) {
    next(err);
  }
});
// Delete movie API
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await findMovieByMovieId(movieId);
    if (!movie) {
      res.status(404);
      throw new Error('No movie found for given id');
    }
    const deletedMovie = await deleteMovieById(movieId);

    res.json({
      deletedMovie,
    });
  } catch (err) {
    next(err);
  }
});
// update movie API
router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const movieId = req.params.id;

    const movieCheck = await findMovieByMovieId(movieId);

    if (!movieCheck) {
      res.status(404);
      throw new Error('No movie found for given id');
    }
    const {
      movieName, rating, userId, cast, releaseDate,
    } = req.body;

    const movie = await updateMovie({
      movieName, rating, userId, cast, releaseDate,
    }, movieId);

    res.json({
      movie,
    });
  } catch (err) {
    next(err);
  }
});

// Get movie API
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await findMovieByMovieId(movieId);
    if (!movie) {
      res.status(404);
      throw new Error('No movie found for given id');
    }
    res.json({
      movie,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
