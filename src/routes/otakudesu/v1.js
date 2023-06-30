const express = require('express');
const router = express.Router();

const otakudesu = require('../../handler/http/api/v1/otakudesu');

router.get('/ongoing', otakudesu.ongoing);
router.get('/complete', otakudesu.complete);
router.get('/anime/:detail', otakudesu.detail);
router.get('/episode/:detail', otakudesu.episode);

module.exports = router;