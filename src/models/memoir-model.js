const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let memoirSchema = mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId,  ref: "User"},
    dummy: {type: Boolean, default: false}
}, { timestamps: true });

let Memoir = mongoose.model('Memoir', memoirSchema);

module.exports = Memoir;