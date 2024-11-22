import { ObjectId } from "mongodb";

export const getAll = (collection) =>
	collection.find().toArray();

export const getById = (collection, id) =>
	collection.findOne({}, {
		'_id': ObjectId.createFromHexString(id)
	});

export const getByDescription = (collection, description) =>
	collection.findOne({
		'descricao': description
	});

export const create = (collection, newElement) =>
	collection.insertOne(newElement);

export const update = (collection, updateElement, id) => {
	const objID = ObjectId.createFromHexString(id);

	return collection.updateOne({ _id: new ObjectId(objID) }, {
		$set: updateElement
	})
}
