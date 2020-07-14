const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
    /*
    * Changes from conceptual diagram:
    * I put the first_name, middle_name and last_name in here instead of both guide and traveller.
    */
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: String,
    address: String,
    birthday: Date,
    phone: String,
    preferences: {
        type: String,
        required: function() {
            return this.type == 'traveler';
        }},
    expertise: {
        type: String,
        required: function() {
            return this.type == 'guide';
        }},
    language: {
        type: String,
            required: function() {
        return this.type == 'guide';
    }},
    type: {
        type: String,
        enum: ['admin', 'guide', 'traveler'],
        required: true
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.getUserName = function() {
    return this.name;
};

//UserSchema.plugin(require('mongoose-beautiful-unique-validation'));
module.exports = mongoose.model('Users', UserSchema);
