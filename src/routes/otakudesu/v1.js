const express = require('express');
const router = express.Router();

const otakudesu = require('../../handler/http/api/v1/otakudesu');

router.get('/ongoing', otakudesu.ongoing);

module.exports = router;