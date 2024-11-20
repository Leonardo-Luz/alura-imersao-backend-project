import { Router } from "express";
import { getAllHandler } from "../controllers/posts.controller.js";

export const router = Router();

router.get("/", getAllHandler);

router.get("/:id", (req, res) => {
})

router.get("/descricao/:descricao", (req, res) => {
})

