const mongoose = require('mongoose');
const Review = require('./review')
const Shema = mongoose.Schema;

const CampgroundSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Shema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Shema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})


module.exports = mongoose.model('Campground', CampgroundSchema);


