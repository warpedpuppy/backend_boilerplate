const express = require('express');
const memoirRouter = express.Router();
const jsonBodyParser = express.json();
const requireAuth = require('../middleware/jwt-auth');
const MemoirServices = require('./memoirs.services');

memoirRouter
.get('/', requireAuth, async (req, res) => {
    let memoirs = await MemoirServices.getMemoirs();
    let authors = memoirs.map( memoir => {return {author: memoir.user.username, id: memoir._id}});

    if (memoirs) {
        res.status(200).json({memoirs, authors})
    } 
})
.get('/:id', requireAuth, async (req, res) => {
    let memoir = await MemoirServices.getMemoir(req.params.id);
    res.status(200).json({memoir})
})
.post('/new-memoir', requireAuth, jsonBodyParser, async (req, res) => {
});


module.exports = memoirRouter;