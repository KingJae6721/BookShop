//express 모듈
const express = require('express')
const app = express()

//dotenv 모듈
const dotenv= require('dotenv')
dotenv.config()

app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Example app listening on port ${process.env.PORT_NUMBER}`)
})
