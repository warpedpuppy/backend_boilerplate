const mongoose = require('mongoose');


let resouceSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
}, { timestamps: true });



let Resource = mongoose.model('Resource', resouceSchema);


module.exports = Resource;