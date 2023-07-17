const { db } = require('../../utils/db');

function findMovieList() {
  return db.movie.findMany();
}

function createMovie(movie) {
  return db.movie.create({
    data: movie,
  });
}

function findMovieByMovieName(movieName) {
  return db.movie.findFirst({
    where: {
      movieName,
    },
  });
}

function findMovieByMovieId(id) {
  return db.movie.findUnique({
    where: {
      id,
    },
  });
}

function deleteMovieById(movieId) {
  return db.movie.delete({
    where: {
      id: movieId,
    },
  });
}

function updateMovie(movie, id) {
  return db.movie.update({
    where: {
      id,
    },
    data: movie,
  });
}
module.exports = {
  findMovieList,
  createMovie,
  findMovieByMovieName,
  findMovieByMovieId,
  deleteMovieById,
  updateMovie,
};
