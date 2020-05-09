import mongoose, { Schema } from "mongoose"
import { composeWithMongoose } from "graphql-compose-mongoose"
import { schemaComposer } from "graphql-compose"

const storeSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		logo: {
			type: String,
		},
		banner: {
			type: String,
		},
		location: {
			type: String,
			required: true,
		},
		tagline: {
			type: String,
		},
		manager: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
)

const Store = mongoose.model("Store", storeSchema)
const StoreTC = composeWithMongoose(Store)

schemaComposer.Query.addFields({
	storeById: StoreTC.getResolver("findById"),
	storeByIds: StoreTC.getResolver("findByIds"),
	storeOne: StoreTC.getResolver("findOne"),
	storeMany: StoreTC.getResolver("findMany"),
	storeCount: StoreTC.getResolver("count"),
	storeConnection: StoreTC.getResolver("connection"),
	storePagination: StoreTC.getResolver("pagination"),
})

schemaComposer.Mutation.addFields({
	storeCreateOne: StoreTC.getResolver("createOne"),
	storeCreateMany: StoreTC.getResolver("createMany"),
	storeUpdateById: StoreTC.getResolver("updateById"),
	storeUpdateOne: StoreTC.getResolver("updateOne"),
	storeUpdateMany: StoreTC.getResolver("updateMany"),
	storeRemoveById: StoreTC.getResolver("removeById"),
	storeRemoveOne: StoreTC.getResolver("removeOne"),
	storeRemoveMany: StoreTC.getResolver("removeMany"),
})

const storeSchemaGQL = schemaComposer.buildSchema()

export default storeSchemaGQL
