const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isloggedIn, isAuthore, validateCampground, validatereiewSchema } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
// const upload = multer({ dest: 'uploads/' })
const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isloggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))


// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);

// })


router.get('/new', isloggedIn, campgrounds.renderNewForm)


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isloggedIn, isAuthore, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isloggedIn, isAuthore, catchAsync(campgrounds.delete))

router.get('/:id/edit', isloggedIn, isAuthore, catchAsync(campgrounds.renderEditForm))


module.exports = router;