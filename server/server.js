import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connetCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';



const app = express()
await connetCloudinary()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(clerkMiddleware())


app.get('/', (req,res)=>res.send('Server is live'));

app.use(requireAuth())
app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)


app.listen(PORT,()=>{
    console.log(`PORT is listening on ${PORT}`)
})