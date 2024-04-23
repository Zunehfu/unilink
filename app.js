const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config({path: './config.env'}) //dotenv paths start from the root

const app = express()
const port = 5000

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/router'))

mongoose.connect(process.env.CONN_STRL, {
    // useNewUrlParser: true
}).then((conn) => {
    console.log('Database connection established!')
}).catch((err) => {
    console.log(err)
    console.log('There is an issue with database connection!')
})

app.listen(port, () => console.log(`Server is running on ${port}!`))