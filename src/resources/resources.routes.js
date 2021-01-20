const express = require('express');
const resourcesRouter = express.Router();
const jsonBodyParser = express.json();
const requireAuth = require('../middleware/jwt-auth');
const ResourceService = require('./resources.services');

resourcesRouter
.get('/', requireAuth, async (req, res) => {
    let resources = await ResourceService.getResources();
    if (resources) {
        res.status(200).json({resources})
    } 
})
.post('/new-resource', requireAuth, jsonBodyParser, async (req, res) => {
});


module.exports = resourcesRouter;