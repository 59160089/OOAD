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
        type: Schema.Types.ObjectId,
        ref: 'room'
    }]
}, {
        collection: 'building'
    })

module.exports = mongoose.model('modelBuilding', Building);