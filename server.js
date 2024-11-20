import express from "express";
import dotenv from "dotenv";
import mongodbConfig from "./src/config/mongodb.config.js";
import { router as postsRouter } from "./src/routes/posts.route.js";
dotenv.config();


const App = express();
App.use(express.json());

const port = process.env.API_PORT;
const host = process.env.API_HOST;

App.listen(process.env.API_PORT, () => {
	console.log(`Server Listening at http://${port}:${host}`);
})

App.use('/posts', postsRouter);

App.get("/sobre", (req, res) => {
	res.status(200).json({
		"nome": "Leonardo Luz",
		"idade": "22",
		"descricao": "Desenvolvedor fullstack"
	})
})





