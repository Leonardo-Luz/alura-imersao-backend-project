
export const getAll = (db) => {
	const collection = db.collection("posts");

	return collection.find().toArray();
}

// export const getById = () => {
// 	posts.findIndex(post => post.id === Number(id))
// }
//
// export const getByDescription = () => {
// 	posts.filter(post => post.descricao === descricao);
// }
