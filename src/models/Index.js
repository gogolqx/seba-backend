const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.role = require("./Role");

db.ROLES = ["admin", "traveller", "guide"];

module.exports = db;