import fs from "fs"

import { create, getAll } from "../service/posts.service.js";
import databaseConnection from "../config/mongodb.config.js";

const connection = await databaseConnection(process.env.CONNECTION_STRING);
const db = connection.db("imersao-instabytes");
const collection = db.collection("posts");

export const getAllHandler = async (req, res) => {
	const response = await getAll(collection);

	res.status(200).json({
		posts: response
	})
}

// export const getByIdHandler = async (req, res) => {
// 	const id = getPostById(req.params.id);
//
// 	res.status(200).json({
// 		post: posts[id]
// 	})
// }
//
// export const getByDescriptionHandler = async (req, res) => {
// 	const filteredPosts = getPostsByDescription(req.params.descricao);
//
// 	res.status(200).json({
// 		posts: filteredPosts
// 	});
// }

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
