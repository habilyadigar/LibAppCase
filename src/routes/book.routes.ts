import { Router } from "express";
import { createBook, getAllBooks, getBook } from "../controllers/book.controller";
import requestValidator from "../middleware/requestValidator";
import { getBookByIdSchema } from "../validation/bookValidation";


const router = Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:bookId", requestValidator(getBookByIdSchema), getBook);


export default router;