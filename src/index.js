const express = require('express')
const app = express()
const port = 3030

const router = require('./config/routes')
const cors = require('cors')
const configureDB = require('./config/database')
configureDB()

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send('Welcome to the ticket-master')
})

app.use('/', router)

app.listen(port, () => {
    console.log('listening to the port,',port)
})
