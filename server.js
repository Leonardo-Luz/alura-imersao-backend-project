import express from "express";
import dotenv from "dotenv";
dotenv.config();

const posts = [
	{
		id: 0,
		descricao: "Teste 1",
		imagem: "https://placecats.com/millie/300/150"
	},
	{
		id: 1,
		descricao: "Teste 2",
		imagem: "https://placecats.com/millie/300/150"
	},
	{
		id: 2,
		descricao: "Teste 3",
		imagem: "https://placecats.com/millie/300/150"
	},
	{
		id: 3,
		descricao: "Teste 4",
		imagem: "https://placecats.com/millie/300/150"
	},
	{
		id: 4,
		descricao: "Teste 5",
		imagem: "https://placecats.com/millie/300/150"
	}
]

const App = express();
App.use(express.json());

const port = process.env.API_PORT;
const host = process.env.API_HOST;

App.listen(process.env.API_PORT, () => {
	console.log(`Server Listening at http://${port}:${host}`);
})

App.get("/posts", (req, res) => {
	res.status(200).json({
		posts: posts
	})
})

const getPostById = (id) =>
	posts.findIndex(post => post.id === Number(id))

App.get("/posts/:id", (req, res) => {
	const id = getPostById(req.params.id);

	res.status(200).json({
		post: posts[id]
	})
})

App.get("/sobre", (req, res) => {
	res.status(200).json({
		"nome": "Leonardo Luz",
		"idade": "22",
		"descricao": "Desenvolvedor fullstack"
	})
})





