import { MongoClient } from "mongodb";

export default async function databaseConnection(stringConnection) {
	let mongoClient;

	try {
		mongoClient = new MongoClient(stringConnection);
		console.log("Connecting to database cluster");

		await mongoClient.connect();
		console.log("Mongo database connected succefully!");

		return mongoClient;
	}
	catch (err) {
		console.log("Unable to connect to the database", err);
		process.exit();
	}
}
