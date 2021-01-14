const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');


let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
}, { timestamps: true });

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


let User = mongoose.model('User', userSchema);


module.exports = User;