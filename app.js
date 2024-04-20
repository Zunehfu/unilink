const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')

dotenv.config({path: './config.env'}) //dotenv paths start from the root

const app = express()
const port = 5000

app.set('view engine', 'hbs');
hbs.localsAsTemplateData(app);
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log('Request Method:', req.method);
    next()
})
app.use('/', require('./routes/router'))

mongoose.connect(process.env.CONN_STRL, {
    // useNewUrlParser: true
}).then((conn) => {
    console.log('DB connection successful')
}).catch((err) => {
    console.log(err)
    console.log('Some error has occured!')
})

app.listen(port, () => console.log(`Listening on port ${port}!`))