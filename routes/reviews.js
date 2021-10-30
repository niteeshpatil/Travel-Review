const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const reviews = require('../controllers/reviews');
const { validatereiewSchema, isloggedIn, isreiewAuthore } = require('../middleware');




// router.delete('/:reviewId', isloggedIn, isreiewAuthore, catchAsync(async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//     req.flash('success', 'Review Deleted!')
//     res.redirect(`/campgrounds/${id}`);
// }))


router.delete('/:reviewId', isloggedIn, isreiewAuthore, catchAsync(reviews.deleteReview))


// router.post('/', validatereiewSchema, isloggedIn, catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     const review = new Review(req.body.review);
//     review.author = req.user._id;
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     req.flash('success', 'Created new review');
//     res.redirect(`/campgrounds/${campground._id}`);
// }))

router.post('/', validatereiewSchema, isloggedIn, catchAsync(reviews.createReview))


module.exports = router;