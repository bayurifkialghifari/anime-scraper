const express = require('express');
const router = express.Router();

const gogoanime = require('../../handler/http/api/v1/gogoanime');

router.get('/ongoing', gogoanime.ongoing);
router.get('/movies', gogoanime.movies);
router.get('/popular', gogoanime.popular);

module.exports = router;
