import express from "express";
import "dotenv/config";
import { json } from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import job from "./lib/cron.js";
import {clerkMiddleware} from "@clerk/express"
import fs from "fs";
import path from "path";

const PORT = process.env.PORT;
const frontend_url=process.env.FRONTEND_URL;
const publicDir=path.join(process.cwd(),"public");
const app = express();

app.use(express.json());
app.use(cors({origin:frontend_url, credentials:true}));

// if the public directory exists , serve the static files
// this is for the production build

if(fs.existsSync(publicDir))
{
  app.use(express.static(publicDir));

  app.get("/{*any}",(req,res,next)=>{
    res.sendFile(path.join(publicDir,"index.html"),(err)=>next(err))
  })
}

app.use(clerkMiddleware())
app.get("/health" , (req,res)=>{
  res.status(200).json({ok:true});
})
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
  if(process.env.NODE_ENV==="production")
  {
    job.start()
  }
});

