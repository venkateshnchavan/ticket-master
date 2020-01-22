const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ticketSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    employee: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    code: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high']
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    message: {
        type: String,
        required: true,
        minlength: 10
    },
    user: {
        type: Schema.Types.ObjectId
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket