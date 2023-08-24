const mongoose = require('mongoose')
const {format} = require('date-fns') 

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        required:true,
        default: false
    },
    date: {
        type: String,
        required: true,
        default: 'MM/dd'
    }
})

module.exports = mongoose.model('Item', itemSchema)