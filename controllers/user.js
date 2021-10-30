
const User = require('../models/user');

module.exports.userRegister = (req, res) => {
    res.render('users/register.ejs');
}


module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcom to Yelp Camp!');
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.loginuser = (req, res) => {
    res.render('users/login');
}


module.exports.postuser = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnto;

    if (redirectUrl) {
        res.redirect(redirectUrl);
        delete req.session.returnto;
    }
    else
        res.redirect('/campgrounds');
}

module.exports.logoutuser = (req, res) => {
    req.logout();
    req.flash('success', 'logout Successfull')
    res.redirect('/campgrounds')
}