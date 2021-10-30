const ExpressError = require('./utils/ExpressError');
const { campgroundSchema } = require('./schemas.js');
const Campground = require('./models/campground');
const { reiewSchema } = require('./schemas.js');
const Review = require('./models/review');

module.exports.isloggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.session.returnto = req.originalUrl;
        req.flash('error', 'login to continue ');
        return res.redirect('/login');
    }
    next();
}



module.exports.validateCampground = (req, res, next) => {

    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 404);
    }
    else {
        next();
    }
}

module.exports.isAuthore = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You are not alowed to do that!!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}


module.exports.validatereiewSchema = (req, res, next) => {
    const { error } = reiewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 404);
    }
    else {
        next();
    }
}


module.exports.isreiewAuthore = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You are not alowed to do that!!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}