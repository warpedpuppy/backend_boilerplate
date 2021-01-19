const express = require('express');
const dummyDataRouter = express.Router();
const DummyDataService = require('./dummy-data.services');
const requireAuth = require('../middleware/jwt-auth');

dummyDataRouter
.get('/', (req, res) => res.send('voila'))
.post('/insert-dummy-data', async (req, res) => {
    let usersResult = await DummyDataService.insertUsers();
    console.log(usersResult);
    res.status(200).json({usersResult})
})
.delete('/delete-dummy-data', async (req, res) => {
    let deleteResult = await DummyDataService.deleteData();
    console.log(deleteResult);
    res.status(200).json({deleteResult})
})


module.exports = dummyDataRouter;