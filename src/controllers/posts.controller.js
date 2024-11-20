import { getAll } from "../service/posts.service.js";
import databaseConnection from "../config/mongodb.config.js";

const connection = await databaseConnection(process.env.CONNECTION_STRING);
const db = connection.db("imersao-instabytes");

export const getAllHandler = async (req, res) => {
	const response = await getAll(db);

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
//
