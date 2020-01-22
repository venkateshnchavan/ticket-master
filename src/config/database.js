const mongoose = require('mongoose')

const configureDB = () => {
    mongoose.connect('mongodb://localhost:27017/ticket-master-bk', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = configureDB
