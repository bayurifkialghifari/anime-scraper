const express = require('express');
const router = express.Router();

const OtakuDesuRoute = require('./otakudesu');
const ExampleHandler = require('../handler/http/example');

router.use('/otakudesu', OtakuDesuRoute);
router.get('/', ExampleHandler.handleExample);

module.exports = router;
