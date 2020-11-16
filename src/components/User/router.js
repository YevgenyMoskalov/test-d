const express = require('express');

const router = express.Router();

const UserComponent = require('./index');

router.post('/signin', UserComponent.signin);
router.post('/signup', UserComponent.signup);

module.exports = router;
