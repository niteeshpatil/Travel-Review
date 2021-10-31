const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const reviews = require('../controllers/reviews');
const { validatereiewSchema, isloggedIn, isreiewAuthore } = require('../middleware');


router.delete('/:reviewId', isloggedIn, isreiewAuthore, catchAsync(reviews.deleteReview))


router.post('/', validatereiewSchema, isloggedIn, catchAsync(reviews.createReview))


module.exports = router;