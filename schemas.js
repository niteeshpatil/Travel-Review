
const Joi = require('Joi');
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object(
        {
            title: Joi.string().required(),
            location: Joi.string().required(),
            image: Joi.string().required(),
            price: Joi.number().required().min(0),
            description: Joi.string().required(),

        }
    ).required()
});

module.exports.reiewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    })
})
