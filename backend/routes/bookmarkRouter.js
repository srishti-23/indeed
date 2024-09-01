import express from 'express';
import { authentication } from '../middlewares/userMiddleware.js';
import {getAllBookmark,getBookmark,createBookmark,deleteBookmark} from '../controllers/bookmarkController.js'
const bookmarkRouter = express.Router();

bookmarkRouter.post('/:id',authentication, createBookmark);
bookmarkRouter.get("/details", authentication, getAllBookmark);
bookmarkRouter.get("/:id", getBookmark);
bookmarkRouter.delete("/:id", deleteBookmark);

export default bookmarkRouter;