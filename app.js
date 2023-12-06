import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './Routes/indexRoutes.js';
import morgan from 'morgan';
import cors from 'cors'

const app=express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json())
const port=7000;


app.use("/api/v1",router)
mongoose.connect(process.env.MONGOURL).then(()=>console.log("H&M Database is connected"))
app.listen(port,()=>console.log(`port working on ${port}`));
