import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectdb from './config/db.js'

dotenv.config()


const app =express()

const PORT = process.env.PORT

connectdb()

app.listen(PORT,()=>{
    console.log(`server conected Sucsessfuly http://localHost:${PORT} `)

})