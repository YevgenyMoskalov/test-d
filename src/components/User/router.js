const express = require('express');

const router = express.Router();

const UserComponent = require('./index');

router.post('/signin', UserComponent.signin);
router.post('/signup', UserComponent.signup);
router.post('/logout', UserComponent.logout);
router.post('/refreshToken', UserComponent.refreshTokens);
router.post('/reset-password', UserComponent.resetPassword);
module.exports = router;
