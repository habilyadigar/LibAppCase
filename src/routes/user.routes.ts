import { Router } from "express";
import {
	createUser,
	getAllUsers,
	getUser,
	createBorrow,
	createReturnBorrow
} from "../controllers/user.controller";
import requestValidator from "../middleware/requestValidator";
import { createUserSchema, getUserByIdSchema } from "../validation/userValidation";
import { borrowSchema, returnSchema } from "../validation/borrowValidation";

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", requestValidator(getUserByIdSchema), getUser);
router.post("/", requestValidator(createUserSchema), createUser);
router.post("/:userId/borrow/:bookId", requestValidator(borrowSchema), createBorrow);
router.post("/:userId/return/:bookId", requestValidator(returnSchema), createReturnBorrow);

export default router;
