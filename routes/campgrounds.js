const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const { isloggedIn, isAuthore, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');




router.get('/', catchAsync(campgrounds.index));

router.get('/new', isloggedIn, campgrounds.renderNewForm)

router.post('/', validateCampground, catchAsync(campgrounds.createCampground))

router.get('/:id', catchAsync(campgrounds.showCampground))

router.get('/:id/edit', isloggedIn, isAuthore, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isloggedIn, isAuthore, campgrounds.updateCampground)

router.delete('/:id', isloggedIn, isAuthore, catchAsync(campgrounds.delete))



module.exports = router;