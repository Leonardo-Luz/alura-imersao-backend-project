import express from "express";
import cors from "cors"
import 'dotenv/config.js';

import { router as postsRouter } from "./src/routes/posts.route.js";

const port = process.env.API_PORT;
const host = process.env.API_HOST;

const corsOption = {
	origin: process.env.FRONT_URL,
	optionsSuccessStatus: 200
}

const app = express();

// NOTE: Rules
app.use(express.json());
app.use(cors(corsOption));
app.use(express.static("uploads"))

// NOTE: Routes
app.use('/posts', postsRouter);
app.get("/sobre", (req, res) => {
	res.status(200).json({
		"nome": "Leonardo Luz",
		"idade": "22",
		"descricao": "Desenvolvedor fullstack"
	})
})

app.listen(process.env.API_PORT, () => {
	console.log(`Server Listening at http://${port}:${host}`);
})




