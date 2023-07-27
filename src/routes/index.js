const express = require('express');
const router = express.Router();

const OtakuDesuRoute = require('./otakudesu');
const GogoAnimeRoute = require('./gogoanime');
const ExampleHandler = require('../handler/http/example');

router.use('/otakudesu', OtakuDesuRoute);
router.use('/gogoanime', GogoAnimeRoute);
router.get('/', ExampleHandler.handleExample);

module.exports = router;
