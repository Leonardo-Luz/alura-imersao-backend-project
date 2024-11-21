import { Router } from "express";
import multer from "multer";

import { createHandler, getAllHandler, uploadHandler } from "../controllers/posts.controller.js";

// NOTE: Windowns multer configuration
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'uploads/');
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.originalname)
// 	}
// })

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

router.get("/:id", (req, res) => {
})

router.get("/descricao/:descricao", (req, res) => {
})

router.post("/", createHandler);

router.post("/upload", upload.single("image"), uploadHandler);
