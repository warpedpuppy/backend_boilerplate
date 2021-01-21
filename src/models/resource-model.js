const mongoose = require('mongoose');
const Config = require('../config');
const Schema = mongoose.Schema;

let resouceSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, enum: Object.keys(Config.RESOURCE_CATEGORIES)},
    icon: {type: String, required: true},
    description: {type: String, required: true},
    webSite: {type: String, required: false},
    phone: {type: String, required: false},
    email: {type: String, required: false}, 
    user: {type: Schema.Types.ObjectId,  ref: "User"},
    dummy: {type: Boolean, default: false}
}, { timestamps: true });

let Resource = mongoose.model('Resource', resouceSchema);

module.exports = Resource;