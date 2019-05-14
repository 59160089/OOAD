const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    uType: {
        type: String
    },
    prefixName: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    faculty: {
        type: String
    },
    major: {
        type: String
    },
    course: [{
        type: Schema.Types.ObjectId,
        ref: 'modelCourse'
    }],
    examiner: [{
        type: Schema.Types.ObjectId,
        ref: 'modelExam'
    }
    ]
    ,
    position: {
        type: String
    }
}, {
        collection: 'person'
    })

module.exports = mongoose.model('modelTeacher', User);