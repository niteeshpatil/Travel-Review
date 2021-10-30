const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new campground({
            author: '61574a3179a25c27c8590b60',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam sunt nisi, quia iusto dolorem labore eligendi nam commodi accusantium minima mollitia, explicabo ad ipsum. Expedita iure suscipit sed repudiandae Quasi laborum error sed expedita! Error incidunt accusamus alias autem omnis, et quibusdam? Rem voluptate dolores nobis iure, neque quas esse iusto fugit saepe commodi officiis asperiores voluptatibus odio sequi?',
            price: (random1000 / 100),
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})