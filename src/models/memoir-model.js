const mongoose = require('mongoose');


let memoirSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
}, { timestamps: true });



let Memoir = mongoose.model('Memoir', memoirSchema);


module.exports = Memoir;