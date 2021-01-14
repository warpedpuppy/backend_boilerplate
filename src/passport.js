const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Users = require('./models/user-model'),
    passportJWT = require('passport-jwt'),
    config = require('./config'),
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt,
    UsersService = require('./users/users.services'),
    jwtService = require('./users/jwts.service');

passport.use(new LocalStrategy ( async (username, password, callback) => {
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
            return callback(null, user);
        } else {
            return callback('bad password')
        }
    } else {
        return callback('unknown user')
    }

}));

passport.use(new JWTStrategy ({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
}, (jwtPayload, callback) => {
       return Users.findById(jwtPayload.userid)
       .then((user) =>{
           return callback(null, user);
       })
       .catch((error) => {
           return callback(error)
       });  
}));