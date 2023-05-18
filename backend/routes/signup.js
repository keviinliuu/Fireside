const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user.model');

router.route('/signup').post(async (req, res) => {
    try {
        const { error } = validate(req.body);
        if(error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const findDupEmail = await User.findOne({ email: req.body.email });
        if(findDupEmail) {
            return res.status(409).send({ message: "User with given email already exists! "});
        }

        const findDupUsername = await User.findOne({ username: req.body.username });
        if(findDupUsername) {
            return res.status(409).send({ message: "That username is taken! "});
        }

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
    } catch (error) {
        res.status(500).send({ message: "Internal server error." });
    }
});

module.exports = router;