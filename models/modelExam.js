const mongoose = require('mongoose')
const Schema = mongoose.Schema

var exam = new Schema({
    season: String,
    date: String,
    timeStart: String,
    timeFinish: String,
   // status: String,
    room: [
        {
            type: Schema.Types.ObjectId,
            ref: 'room'
        }
    ]
    ,
    score: [{
        point: String,
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'modelStudent'
        },
        seatStatus: String
    }]
    ,
    examiner : [{type : Schema.Types.ObjectId , ref : 'User'}]
}, { collation: 'exam' })

module.exports = mongoose.model('modelExam', exam)