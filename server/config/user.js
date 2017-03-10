//import npm mongoose package
let mongoose = require('mongoose');

//create model class
let userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String
},
{
    collection:"user"
});

//db = name of this file that represent the document structure
module.exports = mongoose.model('user',userSchema);