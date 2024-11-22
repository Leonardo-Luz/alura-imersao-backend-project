import fs from "fs"

import { create, getAll, getByDescription, getById, update } from "../models/posts.models.js";
import databaseConnection from "../config/mongodb.config.js";
import createDescriptionWithGemini from "../service/gemini.service.js";

const connection = await databaseConnection(process.env.CONNECTION_STRING);
const db = connection.db("imersao-instabytes");
const collection = db.collection("posts");

export const getAllHandler = async (req, res) => {
	const response = await getAll(collection);

	res.status(200).json({
		posts: response
	})
}

export const getByIdHandler = async (req, res) => {
	const post = await getById(collection, req.params.id);

	if (!post)
		res.status(404).json({ message: "Post not found!" })
	else
		res.status(200).json(post)
}

export const getByDescriptionHandler = async (req, res) => {
	const post = await getByDescription(collection, req.params.descricao);

	if (post)
		res.status(404).json({ message: "Post not found!" })
	else
		res.status(200).json(post)
}

export const createHandler = async (req, res) => {
	const newPost = req.body;

	try {
		const response = await create(collection, newPost);

		res.status(200).json(response);
	}
	catch (err) {
		console.error("Server error!", err.message);

		res.status(500).json({
			"Error": "Request failure"
		});
	}
}

export const uploadHandler = async (req, res) => {
	const newPost = {
		descricao: "",
		imgUrl: req.file.originalname,
		alt: ""
	};

	try {
		const response = await create(collection, newPost);
		const updatedImage = `uploads/${response.insertedId}.png`

		fs.renameSync(req.file.path, updatedImage);

		res.status(200).json(response);
	}
	catch (err) {
		console.error("Server error!", err.message);

		res.status(500).json({
			"Error": "Request failure"
		});
	}
}

export const uploadToPostHandler = async (req, res) => {
	const id = req.params.id;
	const imgUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}/${id}.png`


	try {
		const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
		const descricao = await createDescriptionWithGemini(imgBuffer);

		const newPost = {
			...req.body,
			imgUrl: imgUrl,
			descricao: descricao
		};
		const response = await update(collection, newPost, id);

		res.status(200).json(response);
	}
	catch (err) {
		console.error("Server error!", err.message);

		res.status(500).json({
			"Error": "Request failure"
		});
	}
}
