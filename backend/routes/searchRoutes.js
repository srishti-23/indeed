import express from "express";
import { searchJobs } from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/", searchJobs); // Search jobs by title and location

export default searchRouter;
