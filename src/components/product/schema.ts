import mongoose, { Schema, Document } from "mongoose"
import { composeWithMongoose } from "graphql-compose-mongoose"
import { schemaComposer } from "graphql-compose"
import { IStore } from "../store/schema"
import { ICategory } from "../category/schema"

export interface IProduct extends Document {
	name: string
	price: number
	discount: number
	images: string[]
	description: string
	store: IStore["_id"]
	categories: [ICategory["_id"]]
	createdAt: Date
	updatedAt: Date
}

const productSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		images: { type: [String], required: true },
		discount: { type: Number },
		description: { type: String, required: true },
		store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
		categories: [
			{ type: Schema.Types.ObjectId, ref: "Category", required: true },
		],
	},
	{ timestamps: true }
)

export const ProductModel = mongoose.model<IProduct>("Product", productSchema)

const ProductTC = composeWithMongoose(ProductModel)

schemaComposer.Query.addFields({
	productById: ProductTC.getResolver("findById"),
	productByIds: ProductTC.getResolver("findByIds"),
	productOne: ProductTC.getResolver("findOne"),
	productMany: ProductTC.getResolver("findMany"),
	productCount: ProductTC.getResolver("count"),
	productConnection: ProductTC.getResolver("connection"),
	productPagination: ProductTC.getResolver("pagination"),
})

schemaComposer.Mutation.addFields({
	productCreateOne: ProductTC.getResolver("createOne"),
	productCreateMany: ProductTC.getResolver("createMany"),
	productUpdateById: ProductTC.getResolver("updateById"),
	productUpdateOne: ProductTC.getResolver("updateOne"),
	productUpdateMany: ProductTC.getResolver("updateMany"),
	productRemoveById: ProductTC.getResolver("removeById"),
	productRemoveOne: ProductTC.getResolver("removeOne"),
	productRemoveMany: ProductTC.getResolver("removeMany"),
})

const productSchemaGQL = schemaComposer.buildSchema()

export default productSchemaGQL
