const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var year = new Schema({
    year : {
        type: String
    },
    semester: {
        type: String
    }, 
}, {
        collection: 'year'
    })

module.exports = mongoose.model('modelYear', year);