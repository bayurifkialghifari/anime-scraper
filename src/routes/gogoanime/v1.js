const express = require('express');
const router = express.Router();

const gogoanime = require('../../handler/http/api/v1/gogoanime');

router.get('/ongoing', gogoanime.ongoing);
router.get('/movies', gogoanime.movies);
router.get('/popular', gogoanime.popular);
router.get('/search', gogoanime.search);
router.get('/detail/:slug', gogoanime.detail);

module.exports = router;