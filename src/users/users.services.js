const bcrypt = require('bcryptjs')
const xss = require('xss')
const User = require('../models/user-model');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
  hasUserWithUserName(username) {
      return User.find({username})
      .then(name => name)
      .catch(error => console.error(error))
  },
  async insertUser(newUser) {
    let user = await User.create(newUser);
    return this.serializeUser(user)
  },
  validatePassword(password) {
    // if (password.length < 8) {
    //   return 'Password be longer than 8 characters'
    // }
    // if (password.length > 72) {
    //   return 'Password be less than 72 characters'
    // }
    // if (password.startsWith(' ') || password.endsWith(' ')) {
    //   return 'Password must not start or end with empty spaces'
    // }
    // if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
    //   return 'Password must contain one upper case, lower case, number and special character'
    // }
    return null
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash)
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  serializeUser(user) {
    return {
      id: user._id,
      username: xss(user.username),
      date_created: new Date(user.createdAt),
    }
  },
}

module.exports = UsersService