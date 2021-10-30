const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/user');

const User = require('../models/user');

// router.get('/register', (req, res) => {
//     res.render('users/register.ejs');
// })


router.get('/register', users.userRegister);

// router.post('/register', catchAsync(async (req, res) => {
//     try {
//         const { email, username, password } = req.body;
//         const user = new User({ email, username });
//         const registerUser = await User.register(user, password);
//         req.login(registerUser, err => {
//             if (err) return next(err);
//             req.flash('success', 'Welcom to Yelp Camp!');
//             res.redirect('/campgrounds')
//         })
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('/register');
//     }
// }))

router.post('/register', catchAsync(users.register));




// router.get('/login', (req, res) => {
//     res.render('users/login');
// })


router.get('/login', users.loginuser);




// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     req.flash('success', 'Welcome back');
//     const redirectUrl = req.session.returnto;

//     if (redirectUrl) {
//         res.redirect(redirectUrl);
//         delete req.session.returnto;
//     }
//     else
//         res.redirect('/campgrounds');
// })


router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.postuser)

router.get('/logout', users.logoutuser)

module.exports = router;