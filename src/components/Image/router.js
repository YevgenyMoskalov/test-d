const { Router } = require('express');
const controller = require('../../controllers/image');
// const auth = require('../../config/middleware');
const router = Router();

router.get('/Image/operations', controller.getAll);
router.get('/Image/Range', controller.getRange);
router.post('/Image/resize', controller.resize);
router.post('/Image/crop', controller.crop);

module.exports = router;
