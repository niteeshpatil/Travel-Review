const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
// const Campground = require('../models/campground');
const { isloggedIn, isAuthore, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
// const campground = require('../models/campground');




// router.get('/', catchAsync(async (req, res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campground/index.ejs', { campgrounds })
// }))


router.get('/', catchAsync(campgrounds.index));

// router.get('/new', isloggedIn, (req, res) => {
//     res.render('campground/new.ejs');
// })


router.get('/new', isloggedIn, campgrounds.renderNewForm)


// router.post('/', validateCampground, catchAsync(async (req, res, next) => {
//     // if (!req.body.campground) throw new ExpressError('Invalid Campgroud Data', 404);

//     const campground = new Campground(req.body.campground);
//     campground.author = req.user._id;
//     await campground.save();
//     req.flash('success', 'Successfuly made a new Campground!');
//     res.redirect(`/campgrounds/${campground._id}`)

// }))


router.post('/', validateCampground, catchAsync(campgrounds.createCampground))


// router.get('/:id', catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id).populate({
//         path: 'reviews',
//         populate: {
//             path: 'author',
//         }
//     }
//     ).populate('author');
//     if (!campground) {
//         req.flash('error', ' cannot find that Capmground!');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campground/show.ejs', { campground });
// }))


router.get('/:id', catchAsync(campgrounds.showCampground))

// router.get('/:id/edit', isloggedIn, isAuthore, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id);
//     if (!campground) {
//         req.flash('error', ' cannot find that Capmground!');
//         return res.redirect('/campgrounds');
//     }

//     res.render('campground/edit.ejs', { campground });
// }))

router.get('/:id/edit', isloggedIn, isAuthore, catchAsync(campgrounds.renderEditForm))

// router.put('/:id', isloggedIn, isAuthore, async (req, res, next) => {

//     try {
//         const { id } = req.params;
//         const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
//         req.flash('success', 'Successfuly updated campground!')
//         res.redirect(`/campgrounds/${campground._id}`)
//     }
//     catch (e) {
//         next(e);
//     }

// })


router.put('/:id', isloggedIn, isAuthore, campgrounds.updateCampground)

// router.delete('/:id', isloggedIn, isAuthore, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Campground.findByIdAndDelete(id);
//     req.flash('success', 'Deleted Campground!')
//     res.redirect('/campgrounds');
// }))


router.delete('/:id', isloggedIn, isAuthore, catchAsync(campgrounds.delete))



module.exports = router;