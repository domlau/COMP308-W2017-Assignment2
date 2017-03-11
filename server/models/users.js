//import npm mongoose package
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

//create model class
let UserSchema = new Schema({
    userName: {
        type: String,
        default:'',
        trim:true,
        required:'username is required'
    },
   /* password: {
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    },*/
    email: {
        type: String,
        default:'',
        trim:true,
        required: 'email is required'
    },
    displayName:{
        type:String,
        default:'',
        trim:true,
        required:'Display name is required'
    },
    created: {
        type:Date,
        default: Date.now
    } 
},
{
    collection:"users"
});

let options = ({missingPasswordError: "wrong password"});

UserSchema.plugin(passportLocalMongoose,options);

//db = name of this file that represent the document structuree
exports.User = mongoose.model('User',UserSchema);