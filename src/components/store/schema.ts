import { ApolloError, AuthenticationError } from "apollo-server-express"
import mongoose, { Schema, Document } from "mongoose"
import { composeWithMongoose } from "graphql-compose-mongoose"
import { schemaComposer } from "graphql-compose"
import { IUser } from "../user/schema"

export interface IStore extends Document {
	name: string
	slug: string
	logo: string
	banner: string
	location: string
	tagline: string
	manager: IUser["_id"]
	createdAt: Date
	updatedAt: Date
}

const storeSchema: Schema = new Schema(
	{
		name: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		logo: { type: String },
		banner: { type: String },
		location: { type: String, required: true },
		tagline: { type: String },
		manager: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
)

export const StoreModel = mongoose.model<IStore>("Store", storeSchema)

const StoreTC = composeWithMongoose(StoreModel)

StoreTC.addResolver({
	name: "readMyStore",
	type: StoreTC.getTypeNonNull(),
	resolve: async ({ context }) => {
		if (!context.user) throw new AuthenticationError("User not logged in")
		const store = await context.db.Store.findOne({
			manager: context.user._id,
		})
		if (!store) throw new ApolloError("No store found")
		return store
	},
})

schemaComposer.Query.addFields({
	readMyStore: StoreTC.getResolver("readMyStore"),
	// storeById: StoreTC.getResolver("findById"),
	// storeByIds: StoreTC.getResolver("findByIds"),
	// storeOne: StoreTC.getResolver("findOne"),
	// storeMany: StoreTC.getResolver("findMany"),
	// storeCount: StoreTC.getResolver("count"),
	// storeConnection: StoreTC.getResolver("connection"),
	// storePagination: StoreTC.getResolver("pagination"),
})

schemaComposer.Mutation.addFields({
	storeCreateOne: StoreTC.getResolver("createOne"),
	// storeCreateMany: StoreTC.getResolver("createMany"),
	// storeUpdateById: StoreTC.getResolver("updateById"),
	storeUpdateOne: StoreTC.getResolver("updateOne"),
	// storeUpdateMany: StoreTC.getResolver("updateMany"),
	// storeRemoveById: StoreTC.getResolver("removeById"),
	// storeRemoveOne: StoreTC.getResolver("removeOne"),
	// storeRemoveMany: StoreTC.getResolver("removeMany"),
})

const storeSchemaGQL = schemaComposer.buildSchema()

export default storeSchemaGQL
