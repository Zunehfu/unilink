const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const hbs = require('hbs');

dotenv.config({path: './config.env'}) //dotenv paths start from the root

const app = express()
const port = 5000

app.set('view engine', 'hbs');
hbs.localsAsTemplateData(app);
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/', require('./routes/router'))

mongoose.connect(process.env.CONN_STRL, {
    useNewUrlParser: true
}).then((conn) => {
    console.log(conn)
    console.log('DB connection successful')
}).catch((err) => {
    console.log(err)
    console.log('Some error has occured!')
})

app.get('/login', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Listening on port ${port}!`))