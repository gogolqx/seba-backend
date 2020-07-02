const mongoose = require('mongoose');
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    /*
    * Changes from conceptual diagram:
    * I put the first_name, middle_name and last_name in here instead of both guide and traveller.
    */
    id: {
        type: Number,
        required: true
    },
    //not every user has a guide id...every guide is a user , vice versa may not be true
    //guide_id: Number,
    //traveller_id: Number,
    first_name:  {
        type: String,
        required: true
    },
    middle_name: String,
    last_name:  {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    hashed_password: {
        type: String,
        required: true
    },
    country: String,
    phone_number: Number,
    country_code: Number,
    card_number: Number,
    address: String,
    salt: String,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    guide: {
        type: Boolean,
        default: false
    },
});
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

module.exports = mongoose.model('Users', UserSchema);