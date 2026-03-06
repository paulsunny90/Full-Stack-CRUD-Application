import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectdb from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()


const app =express()

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);

const PORT = process.env.PORT

connectdb()

app.listen(PORT,()=>{
    console.log(`server conected Sucsessfuly http://localHost:${PORT} `)

})