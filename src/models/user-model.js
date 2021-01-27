const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');
      const Schema = mongoose.Schema;

let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    personalStatement: {type: String, required: true},
    imageRef: {type: String, required: true},
    subscriptions: [{type: Schema.Types.ObjectId,  ref: "User"}],
    memoirs: [{type: Schema.Types.ObjectId,  ref: "Memoir"}],
    resources: [{type: Schema.Types.ObjectId,  ref: "Resource"}],
    dummy: {type: Boolean, default: false}
}, { timestamps: true });

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


let User = mongoose.model('User', userSchema);


module.exports = User;