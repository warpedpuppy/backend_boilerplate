const Memoirs = require('../models/memoir-model');

const MemoirsService = {
    getMemoirs: async function () {
        return await Memoirs.find().populate('user');
    }
}

module.exports = MemoirsService;