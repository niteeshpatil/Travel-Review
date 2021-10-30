const Campground = require('../models/campground');



module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campground/index.ejs', { campgrounds })
}


module.exports.renderNewForm = (req, res) => {
    res.render('campground/new.ejs');
}


module.exports.createCampground = async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError('Invalid Campgroud Data', 404);

    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfuly made a new Campground!');
    res.redirect(`/campgrounds/${campground._id}`)

}


module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
        }
    }
    ).populate('author');
    if (!campground) {
        req.flash('error', ' cannot find that Capmground!');
        return res.redirect('/campgrounds');
    }
    res.render('campground/show.ejs', { campground });
}


module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', ' cannot find that Capmground!');
        return res.redirect('/campgrounds');
    }

    res.render('campground/edit.ejs', { campground });
}


module.exports.updateCampground = async (req, res, next) => {

    try {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
        req.flash('success', 'Successfuly updated campground!')
        res.redirect(`/campgrounds/${campground._id}`)
    }
    catch (e) {
        next(e);
    }

}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Deleted Campground!')
    res.redirect('/campgrounds');
}