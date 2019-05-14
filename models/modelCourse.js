const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var course = new Schema({
    sub_id: {
        type: Schema.Types.ObjectId,
        ref: 'modelSubject'
    },
    year: String,
    semester: String,
    section: String,
    exam: [{
        type: Schema.Types.ObjectId,
        ref: 'modelExam'
    }],
    student: [{
        type: Schema.Types.ObjectId,
        ref: 'modelStudent'
    }],
    teacher: [{
        type: Schema.Types.ObjectId,
        ref: 'modelTeacher'
    }]

}, {
        collection: 'course'
    })

module.exports = mongoose.model('modelCourse', course);