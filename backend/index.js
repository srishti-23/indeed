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
const allowedOrigins = [
    "http://localhost:5173",
    "https://backend--indeed-app.netlify.app",
    "https://api.adzuna.com/v1/api/jobs/gb/top_companies?app_id=7ba37328&app_key=5cd06c669e15639b874c09749126949e&what=cook&content-type=application/json"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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
