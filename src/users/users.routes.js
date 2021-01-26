const express = require('express');
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const UsersService = require('./users.services');
const jwtService = require('./jwts.service');
const requireAuth = require('../middleware/jwt-auth');

usersRouter
.get('/', async (req, res) =>{
    let users = await UsersService.getAll();
    res.status(200).json({users})
})
.get('/:id', requireAuth, async (req, res) =>{
    let user = await UsersService.getUser(req.params.id);
    res.status(200).json({user})
})
.post('/register', jsonBodyParser, async (req, res) => {

    const {username, password, email} = req.body;
    console.log(req.body)

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
        res.status(200).json({success: true, data: insertSuccess})

    } else {
        res.status(200).json({success: false, message: "username taken"})
    }
 
})
.post('/login', jsonBodyParser, async (req, res) => {
    const { username, password } = req.body;
    if ( !username || !password ) {
        res.status(400).json({status: 'missing data'})
    }
    let getUserData = await UsersService.hasUserWithUserName(username);
    if (getUserData && getUserData.username) {
        let checkPassword = await UsersService.comparePasswords(password, getUserData.password)
        if (checkPassword) {
            const sub = getUserData.username;
            const payload = { userid: getUserData.id };
            const token = jwtService.createJwt(sub, payload);
            let user = UsersService.serializeUser(getUserData);
            user.token = token;
            res.status(200).json({success: true, data: user})
        } else {
            res.status(200).json({success: false, message: 'bad password'})
        }
    } else {
        res.status(200).json({success: false, message: 'unknown user'})
    }
    
})
.get('/profile', requireAuth, (req, res) => {
    res.json({sucess: true, user: req.user})
})
module.exports = usersRouter;