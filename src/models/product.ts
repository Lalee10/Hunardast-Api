import { Schema } from "mongoose"

const { ObjectId } = Schema.Types

const productSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		images: { type: [String] },
		discount: { type: Number, default: 0 },
		description: { type: String, required: true },
		sizes: { type: [String] },
		colors: { type: [String] },
		store: { type: ObjectId, ref: "Store", required: true },
		categories: { type: [ObjectId], ref: "Category", required: true },
	},
	{ timestamps: true }
)

export default productSchema
