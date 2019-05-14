var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Room = new Schema({
    name: String,
    floor: String,
    col: String,
    row: String,
    seat: [{
        no: String,
        student: {
            type: Schema.Types.ObjectId,
            ref: 'modelStudent'
        }
    }]
}, { collection: 'room' })

module.exports = mongoose.model('room', Room)