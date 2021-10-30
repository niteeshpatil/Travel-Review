const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const app = express();
app.engine('ejs', engine);
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');



const campgroundsRoutes = require('./routes/campgrounds');
const ReviewsRoutes = require('./routes/reviews');
const UserRoutes = require('./routes/users')

const sessionConfig = {
    secret: "thisissecret!",
    resave: false,
    saveinitinalized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}



mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});




app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));




app.use(express.static(path.join(__dirname, 'public')));

app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', ReviewsRoutes);
app.use('/', UserRoutes);


app.get('/fakeUser', async (req, res) => {
    const user = new User({ email: 'niteesh@gmail.com', username: 'nittti' })
    const newUser = await User.register(user, '123');
    res.send(newUser);
})


app.get('/', (req, res) => {
    res.render('home.ejs')
})


app.all('*', (req, res, next) => {
    next(new ExpressError('page not found', 404))
})
//this for assing request not maching above all links then 

app.use((err, req, res, next) => {
    const { message = "something went wrong", statusCode = 500 } = err;
    res.status(statusCode).render('error.ejs', { message, statusCode, err });
})

app.listen(3000, () => {
    console.log('Serving on Port 3000')
})
