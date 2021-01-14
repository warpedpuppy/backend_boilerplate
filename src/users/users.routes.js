const express = require('express');
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const UsersService = require('./users.services');
const jwtService = require('./jwts.service');

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
    if (!hasUserName[0]) {
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
.post('/login', jsonBodyParser, async (req, res) => {
    const { username, password } = req.body;
    if ( !username || !password ) {
        res.status(400).json({status: 'missing data'})
    }
    let getUserData = await UsersService.hasUserWithUserName(username);
    if (getUserData[0] && getUserData[0].username) {
        let checkPassword = await UsersService.comparePasswords(password, getUserData[0].password)
        if (checkPassword) {
            const sub = getUserData[0].username;
            const payload = { userid: getUserData[0].id };
            const token = jwtService.createJwt(sub, payload);
            let user = UsersService.serializeUser(getUserData[0]);
            user.token = token;
            res.status(200).json({user})
        } else {
            res.status(400).json({status: 'bad password'})
        }
    } else {
        res.status(400).json({status: 'unknown user'})
    }
    
})
.get('/profile', (req, res) => {
    res.send('restricted')
})
module.exports = usersRouter;