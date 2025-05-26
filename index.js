import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.js";
import companyRoute from "./routes/company.js"
import jobRoute from "./routes/job.js"
import applicationRoute from "./routes/application.js"
dotenv.config({});

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
   origin:'http://localhost:5173',
   credentials:true
}
app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/app",applicationRoute);


app.listen(process.env.PORT,()=>{
   connectDB();
   console.log("server running");
})