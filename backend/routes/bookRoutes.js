import express from "express";
import {createBook, getBook, getBookById, updateBook, deleteBook, updateBookCover} from  "../controllers/bookController.js"
import {protect} from "../middlewares/authMiddleware.js"
import {upload} from "../middlewares/uploadMiddleware.js"

const router = express.Router();

// apply protect middleware to all routes in this file
router.use(protect);

router.route("/").post(createBook).get(getBook);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/cover/:id").put(upload, updateBookCover);

export default router;
