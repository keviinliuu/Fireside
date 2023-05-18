const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', function (next)  {
    const user = this;
    if(!user.isModified('password')) {
        return next;
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"});
    return token;
}

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().required().label("First Name"),
        lastname: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        password: passwordComplexity({
            min: 8,
            max: 20,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 4
        }).required().label("Password")
    });
    return schema.validate(data);
}

module.exports = {User, validate};



/*
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
      callback(null, isMatch);
    });
  };
*/