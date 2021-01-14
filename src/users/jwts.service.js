const jwt = require('jsonwebtoken')
const config = require('../config')

const jwtService = {
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
          subject,
          expiresIn: '7d',
          algorithm: 'HS256',
        })
    },
    verifyJwt(token) {
        return jwt.verify(token, config.JWT_SECRET, {
            algorithms: ['HS256'],
        })
    },
    // parseBasicToken(token) {
    // return Buffer
    //     .from(token, 'base64')
    //     .toString()
    //     .split(':')
    // }
        

}

module.exports = jwtService;