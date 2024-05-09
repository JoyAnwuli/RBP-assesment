const express = require("express");
const mongoose = require('mongoose');
const user = require('./models/users');
const User = require("./models/users");
const bcrypt = require("bcrypt")
const session = require('express-session');
const flash = require('connect-flash');
const userRouter = require('./Routes/user');
const app = express();
const port = process.env.PORT || 3000;
const passport = require("passport")

//passport config
require("./config/passport")(passport);

//Ejs view engine
app.set('view engine', 'ejs');


// body-parser 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//express session middle ware
app.use(session({
    secret: 'secret', // Change this to a secret key for session encryption
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//flash message middleware
app.use(flash());


//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();

})

//connecting to the mongoDB database
const dbUri = 'mongodb+srv://desmond:desmond54213@cluster0.d4ugy5t.mongodb.net/Jobchallenge?retryWrites=true&w=majority';
mongoose.connect(dbUri)
    .then(() => {
        console.log("Connected to Database")

        app.listen(port, (req, res) => {
            console.log(`Server started at port ${port}`);
        })
    })



// Routes that contain user are sent to the route/users.js file to handle
app.use('/users', userRouter);

//Routes to the dashboard, login and register pages
app.get("/", (req, res) => {
    res.render('dashboard');
})
app.get('/register', (req, res) => {
    res.render('index');
})
app.get('/login', (req, res) => {
    res.render('login');
})

