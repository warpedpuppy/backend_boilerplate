const mongoose = require('mongoose');
const Config = require('../config');
const Schema = mongoose.Schema;

let resouceSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, enum: Config.RESOURCE_CATEGORIES},
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId,  ref: "User"},
    dummy: {type: Boolean, default: false}
}, { timestamps: true });

let Resource = mongoose.model('Resource', resouceSchema);

module.exports = Resource;