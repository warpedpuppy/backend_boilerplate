const bcrypt = require('bcryptjs')
const xss = require('xss')
const User = require('../models/user-model');
const Memoir = require('../models/memoir-model');
const Resources = require('../models/resource-model');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
  getAll: async function () {
    let users = await User.find({username: {$ne: "admin"}});
    return users.map( user => this.serializeUser(user))
  },
  getUser: async function (_id, withSubscriptions) {

    if (!withSubscriptions) {
      let user = await User.findOne({_id}).populate('memoirs', 'title');
      user.subscriptions = undefined;
      return this.serializeUser(user);
    } else {
      let user = await User.findOne({_id}).populate('memoirs', 'title').populate('subscriptions', 'username');
      return this.serializeUser(user);
    }
   
  },
  subscribe: async function (user, subscribeTo) {
    let result = await User.updateOne({_id: user}, {$addToSet: {subscriptions: subscribeTo} }, {new: true})
    return result;
  },
  getSubscriptions: async function (id) {
    return await User.find({_id: id}).select('subscriptions');
  },
  hasUserWithUserName(username) {
      return User.findOne({username})
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
      imageRef: xss(user.imageRef),
      personalStatement: xss(user.personalStatement),
      memoirs: user.memoirs || [],
      subscriptions: user.subscriptions || []
    }
  }
}

module.exports = UsersService
