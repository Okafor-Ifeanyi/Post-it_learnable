const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./src/routes/index.route')
const errorHandler = require('./src/middlewares/error.middleware')

require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/v1/', router)

app.use(errorHandler)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})
.then(() => {
    console.log("Connected!!")
})
.catch((err) => {
    console.log("There is an issue trying to connect to your database")
})
 
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})