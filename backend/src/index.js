import express from "express";
import "dotenv/config";
import { json } from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import {clerkMiddleware} from "@clerk/express"

console.log("DB URL is : ",process.env.DB_URL);
const PORT = process.env.PORT;
const frontend_url=process.env.FRONTEND_URL;
const app = express();

app.use(express.json());
app.use(cors({origin:frontend_url, credentials:true}));

app.use(clerkMiddleware())
app.get("/health" , (req,res)=>{
  res.status(200).json({ok:true});
})
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

