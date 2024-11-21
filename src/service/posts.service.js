
export const getAll = (collection) => {
	return collection.find().toArray();
}

// export const getById = () => {
// 	posts.findIndex(post => post.id === Number(id))
// }
//
// export const getByDescription = () => {
// 	posts.filter(post => post.descricao === descricao);
// }

export const create = (collection, newElement) => {
	return collection.insertOne(newElement);
}
