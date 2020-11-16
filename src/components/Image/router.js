const { Router } = require('express');
const ImageComponent = require('./index');
const { auth } = require('../../config/middleware');

const router = Router();

router.get('/Image/operations', auth, ImageComponent.findAll);
router.get('/Image/Range', auth, ImageComponent.getRange);
router.post('/Image/resize', auth, ImageComponent.resize);
router.post('/Image/crop', auth, ImageComponent.crop);

module.exports = router;
