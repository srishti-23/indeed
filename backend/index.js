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
    "https://indeed1.netlify.app",
];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like from Postman) or matching origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true
}));

// Explicitly handle preflight OPTIONS requests
app.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(200).send();
});

  

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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDb();
    console.log(`Server listening at ${PORT}`);
});
