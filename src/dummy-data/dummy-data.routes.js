const express = require('express');
const dummyDataRouter = express.Router();
const DummyDataService = require('./dummy-data.services');
const requireAuth = require('../middleware/jwt-auth');

dummyDataRouter
.get('/', (req, res) => res.send('voila'))
.post('/insert-dummy-data', async (req, res) => {
    let usersResult = await DummyDataService.insertUsers();
    let resourcesResult = await DummyDataService.insertResources();
    let memoirResult = await DummyDataService.insertMemoirs();
    res.status(200).json({memoirResult, usersResult, resourcesResult})
})
.delete('/delete-dummy-data', async (req, res) => {
    let deleteResult = await DummyDataService.deleteData();
    res.status(200).json({deleteResult})
})


module.exports = dummyDataRouter;