const Memoirs = require('../models/memoir-model');

const MemoirsService = {
    getMemoirs: async function () {
        return await Memoirs.find().populate('user');
    },
    getMemoir: async function (_id) {
        return await Memoirs.findOne({_id}).populate('user');
    }
}

module.exports = MemoirsService;