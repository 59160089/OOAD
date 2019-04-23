const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var Building = new Schema({
    buildingName: {
        type: String
    },
    floor: {
        type: Number
    },
    room: [{
        room_name: String,
        floor_room: String,
        row_room: String,
        column_room: String
    }]
}, {
    collection: 'building'
})

module.exports = mongoose.model('modelBuilding', Building);