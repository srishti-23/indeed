import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import jobRouter from "./routes/jobRoutes.js";
import companyRouter from "./routes/companyRoutes.js";
import skillRouter from "./routes/skillRouter.js";
import categoryRouter from "./routes/categoryRouter.js"
import applyRouter from "./routes/applyRoutes.js";
import bookmarkRouter from "./routes/bookmarkRouter.js";
import searchRouter from "./routes/searchRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
  }));
  

//Routes
app.use("/api/user", userRouter);
app.use("/api/job",jobRouter)
app.use("/api/company",companyRouter)
app.use("/api/skills",skillRouter)
app.use("/api/category",categoryRouter)
app.use("/api/apply",applyRouter)
app.use("/api/bookmark",bookmarkRouter)
app.use("/api/search", searchRouter)

app.get("/", (req, res) => {
    res.status(200).send("Welcome to job portal");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    connectDb();
    console.log(`Server listening at ${PORT}`);
});
