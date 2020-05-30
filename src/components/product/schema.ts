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
	sizes: string[]
	colors: string[]
	store: IStore["_id"]
	category: string
	createdAt: Date
	updatedAt: Date
	renewedAt: Date
	renewalType: "auto" | "manual"
}

const productSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		images: { type: [String], default: [] },
		discount: { type: Number },
		description: { type: String, required: true },
		sizes: { type: [String], default: [] },
		colors: { type: [String], default: [] },
		store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
		category: { type: String, required: true },
		renewedAt: { type: Date, default: Date.now },
		renewalType: { type: String, required: true, default: "manual" },
	},
	{ timestamps: true }
)

export const ProductModel = mongoose.model<IProduct>("Product", productSchema)

const ProductTC = composeWithMongoose(ProductModel)

schemaComposer.Query.addFields({
	productById: ProductTC.getResolver("findById"),
	// productByIds: ProductTC.getResolver("findByIds"),
	// productOne: ProductTC.getResolver("findOne"),
	// productMany: ProductTC.getResolver("findMany"),
	// productCount: ProductTC.getResolver("count"),
	// productConnection: ProductTC.getResolver("connection"),
	// productPagination: ProductTC.getResolver("pagination"),
})

const productCreateOne = ProductTC.getResolver("createOne").wrap(
	(newResolver) => {
		newResolver.setType(newResolver.type.getTypeNonNull())
		return newResolver
	}
)

schemaComposer.Mutation.addFields({
	productCreateOne: productCreateOne,
	// productCreateMany: ProductTC.getResolver("createMany"),
	productUpdateById: ProductTC.getResolver("updateById"),
	// productUpdateOne: ProductTC.getResolver("updateOne"),
	// productUpdateMany: ProductTC.getResolver("updateMany"),
	// productRemoveById: ProductTC.getResolver("removeById"),
	// productRemoveOne: ProductTC.getResolver("removeOne"),
	// productRemoveMany: ProductTC.getResolver("removeMany"),
})

const productSchemaGQL = schemaComposer.buildSchema()

export default productSchemaGQL
