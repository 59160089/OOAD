const mongoose = require('mongoose')
const Schema = mongoose.Schema

var exam = new Schema({
    season : String,       
    date: String,
    timeStart: String,
    timeFinish: String,
    status: String,
    room : [{
        building : {
            type : Schema.Types.ObjectId,
            ref : 'modelBuilding'
        } ,
        room : String
    }]
    ,     
    score: [{
        studentId: String,
        point: String
    }]
}, { collation: 'exam' })

module.exports = mongoose.model('modelExam', exam)