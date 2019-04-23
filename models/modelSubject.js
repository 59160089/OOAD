const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var subject = new Schema({

    sub_id: {
        type: String
    },
    sub_name: {
        type: String
    },
    sub_status: {
        type: String
    },
    course : [{
        type : Schema.Types.ObjectId ,
        ref : 'modelCourse'
    }],
    credit : String
     
}, {
    collection: 'subject'
})

module.exports = mongoose.model('modelSubject', subject);