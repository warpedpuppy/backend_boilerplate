const express = require('express');
const memoirRouter = express.Router();
const jsonBodyParser = express.json();
const requireAuth = require('../middleware/jwt-auth');
const MemoirServices = require('./memoirs.services');

memoirRouter
.get('/', requireAuth, async (req, res) => {
    let memoirs = await MemoirServices.getMemoirs();
    if (memoirs) {
        res.status(200).json({memoirs})
    } 
})
.post('/new-memoir', requireAuth, jsonBodyParser, async (req, res) => {
});


module.exports = memoirRouter;