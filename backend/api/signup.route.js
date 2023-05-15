const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.route('/signup').post((req, res) => {
    const myFirstname = req.body.firstname;
    const myLastname = req.body.lastname;
    const myUsername = req.body.username;
    const myEmail = req.body.email;
    const myPassword = req.body.password;

    const newUser = new User({
        firstname: myFirstname,
        lastname: myLastname,
        username: myUsername,
        email: myEmail,
        password: myPassword
    })

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;