const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const { isloggedIn, isAuthore, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');


const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isloggedIn, validateCampground, catchAsync(campgrounds.createCampground))

    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send("it worked?!")
    })


router.get('/new', isloggedIn, campgrounds.renderNewForm)


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isloggedIn, isAuthore, campgrounds.updateCampground)
    .delete(isloggedIn, isAuthore, catchAsync(campgrounds.delete))

router.get('/:id/edit', isloggedIn, isAuthore, catchAsync(campgrounds.renderEditForm))


module.exports = router;