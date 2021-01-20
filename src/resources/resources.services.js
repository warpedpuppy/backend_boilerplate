const Resources = require('../models/resource-model');

const ResourceService = {
    getResources: async function () {
        return await Resources.find().populate('user');
    }
}

module.exports = ResourceService;