import express from "express";
import dotenv from "dotenv";
dotenv.config();

const App = express();

const port = process.env.API_PORT;
const host = process.env.API_HOST;

App.listen(process.env.API_PORT, () => {
	console.log(`Server Listening at http://${port}:${host}`);
})

App.get("/api", (req, res) => {
	res.status(200).json({
		message: "Boas vindas à imersão!"
	})
})
