const mongoose = require('mongoose');


let resouceSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, enum: ['doctor', 'contractor', 'other']},
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId,  ref: "User"}
}, { timestamps: true });



let Resource = mongoose.model('Resource', resouceSchema);


module.exports = Resource;