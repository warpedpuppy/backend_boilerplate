const express = require('express');
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const UsersService = require('./users.services');
const jwtService = require('./jwts.service');
const requireAuth = require('../middleware/jwt-auth');
const passport = require('passport');
// require('./passport');

usersRouter
.get('/', (req, res) => res.send('voila'))
.post('/register', jsonBodyParser, async (req, res) => {

    const {username, password, email} = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({error: `missing field in registration body`})
    }
    const passwordError = UsersService.validatePassword(password);
    if (passwordError) return res.status(400).json({error: passwordError})

    let hasUserName = await UsersService.hasUserWithUserName(username);
    if (!hasUserName) {
        let hashedPassword = await UsersService.hashPassword(password);
        let insertSuccess = await UsersService.insertUser({username, password: hashedPassword, email})
        const sub = insertSuccess.username;
        const payload = { userid: insertSuccess.id };
        const token = jwtService.createJwt(sub, payload);
        insertSuccess.token = token;
        res.status(200).json({insertSuccess})

    } else {
        res.status(200).send("username already defined")
    }
 
})
.post('/login', jsonBodyParser, UsersService.passportLocalStrategy, async (req, res) => {
    res.status(200).json({user:req.user})
})
.get('/profile',  passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({sucess: true, user: req.user})
})
module.exports = usersRouter;