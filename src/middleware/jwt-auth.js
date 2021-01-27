const jwtService = require('../users/jwts.service')
const UserService = require('../users/users.services');
async function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''
   
  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' })
  } else {
    bearerToken = authToken.slice(7, authToken.length)
  }
  try {
      
    const payload = jwtService.verifyJwt(bearerToken)
    let result = await UserService.hasUserWithUserName(payload.sub)
    let user = await UserService.serializeUser(result)

    if (!user){return res.status(401).json({ error: 'Unauthorized request1' })}
    req.user = user;
    req.userid = payload.userid;
    next()

  } catch(error) {
    res.status(401).json({ error: 'Unauthorized request2' })
  }
}

module.exports = requireAuth
