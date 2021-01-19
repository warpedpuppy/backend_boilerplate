const express = require('express');
const resourcesRouter = express.Router();
const jsonBodyParser = express.json();
const requireAuth = require('../middleware/jwt-auth');

resourcesRouter
.get('/', requireAuth, (req, res) => res.json({data: 'voila'}))
.post('/new-resource', requireAuth, jsonBodyParser, async (req, res) => {
})
;


module.exports = resourcesRouter;