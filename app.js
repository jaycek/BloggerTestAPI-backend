import express from 'express'
import cors from 'cors'
import userRouter from './Routers/userRouter.js'
import postRouter from './Routers/postRouter.js'
import path from 'path';
import mongoose from 'mongoose'
import 'dotenv/config'

const app=express()

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
}
  
main().then(console.log("Connected to DB")).catch(err => console.log(err));

app.use(express.json())
// app.use(cors())

app.use(cors({
    origin: 'https://bloggertestapi-frontend.onrender.com', // Allow specific origin
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
    credentials: true, // Include this if you need cookies/auth headers
}));
app.use('/users',userRouter)
app.use('/posts',postRouter)

const dirname= path.resolve()
app.use(express.static(path.join(dirname,'uploads')))

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

