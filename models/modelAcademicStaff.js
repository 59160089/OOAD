const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
username : {
    type : String 
},
password : {
    type : String
},
uType : {
    type : String
},
prefixName : {
    type : String
},
firstName : {
    type : String
},
lastName : {
    type : String
},
faculty : {
    type : String 
},
gender : {
    type : String
},
age : {
    type : String
}
},{
    collection : 'person'
})

module.exports = mongoose.model('modelAcademicStaff', User);