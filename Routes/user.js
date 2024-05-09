// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');


//Route to list all the users
router.get("/", (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
})

// Route to find user by ID
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})



//route to delete a user by id
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then((result) => {
            res.send(`Blog of id: ${id} has been deleted`)
        })
})

// Route to add a new user
router.post("/", async (req, res) => {
    let { name, email, password, password2 } = req.body;
    const errors = [];

    // Error Checks and handler

    //checks for missing input
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in the blank spaces" });
    }
    //checks if the password and confirm password inputs are identical
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });
    }
    //checks the length of the password
    if (password.length < 3) {
        errors.push({ msg: "Password must be at least 8 characters long" })
    }
    if (errors.length > 0) {
        res.render('index', { errors })
    }

    //hash passwords
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log(hashedPassword);
    // create new user
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword
    })



    user.save()
        .then((result) => {
            req.flash('success_msg', 'You are now registered and can now log in')
            res.redirect('/login')
        })
        .catch((error) => {
            console.log(error);
            // Check if the error is a duplicate key error
            if (error.code === 11000 || error.code === 11001) {
                // Extract the duplicate key field from the error message
                const duplicateKey = Object.keys(error.keyPattern)[0];
                errors.push({ msg: `Duplicate key error: ${duplicateKey} already exists` });
                res.render('index', { errors })
            }

            // when the inputs pass all above checks
        })
})


// Route to update a user's info with an their id
router.put('/:id', async (req, res) => {
    const Id = req.params.id;
    const updateData = req.body; // Assuming req.body contains the updated user data. which are the name email or password

    try {
        // Find the user by ID and update it
        const updatedUser = await User.findOneAndUpdate({ _id: Id }, updateData, { new: true });

        if (updatedUser) {
            return res.status(200).json(updatedUser); // Return the updated user
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


//route for login post
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successFlash: true,
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});





module.exports = router;
