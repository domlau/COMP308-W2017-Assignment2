let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//create model class for contacts
let contactSchema = new Schema({
    contactName: String,
    contactNumber: String,
    emailAddress: String
},
{
    collection:'contacts'
});

module.exports = mongoose.model('contacts',contactSchema);