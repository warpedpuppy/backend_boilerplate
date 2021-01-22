const express = require('express');
const resourcesRouter = express.Router();
const jsonBodyParser = express.json();
const requireAuth = require('../middleware/jwt-auth');
const ResourceService = require('./resources.services');
const Config = require('../config');
resourcesRouter
.get('/', requireAuth, async (req, res) => {
    let resources = await ResourceService.getResources(),
        categories = Config.RESOURCE_CATEGORIES;
    if (resources) {
        res.status(200).json({categories, resources})
    } 
})
.post('/new-resource', requireAuth, jsonBodyParser, async (req, res) => {
});


module.exports = resourcesRouter;