const mongoose = require("mongoose");
const cities = require("./cities");
const{ places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://0.0.0.0:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// helper function to get random ele of an array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "643c8651d3137f11be8bcfd8", // user tammy's id
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price,
            geometry: {
                type :"Point", 
                coordinates:[cities[random1000].longitude, cities[random1000].latitude]}
            , 
            images:  [
                {
                url: 'https://res.cloudinary.com/dhvxvupdh/image/upload/v1682450360/YelpCamp/eroeruolclxdc4gcyj2k.jpg',
                filename: 'YelpCamp/eroeruolclxdc4gcyj2k'
                },
                {
                url: 'https://res.cloudinary.com/dhvxvupdh/image/upload/v1682450364/YelpCamp/rhyj9bwjdcdo5xor0shb.jpg',
                filename: 'YelpCamp/rhyj9bwjdcdo5xor0shb'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})