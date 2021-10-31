const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/user');

const User = require('../models/user');


router.route('/register')
    .get(users.userRegister)
    .post(catchAsync(users.register));


router.route('/login')
    .get(users.loginuser)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.postuser)

router.get('/logout', users.logoutuser)

module.exports = router;