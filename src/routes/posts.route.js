import { Router } from "express";
import multer from "multer";

import { createHandler, getAllHandler, getByDescriptionHandler, getByIdHandler, uploadHandler, uploadToPostHandler } from "../controllers/posts.controller.js";

// NOTE: Keep original file name on linux
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})
const upload = multer({ storage })

export const router = Router();

router.get("/", getAllHandler);
router.get("/:id", getByIdHandler)
router.get("/descricao/:descricao", getByDescriptionHandler)

router.post("/", createHandler);
router.post("/upload", upload.single("image"), uploadHandler);

router.put("/upload/:id", uploadToPostHandler);
