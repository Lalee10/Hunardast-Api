import { Schema } from "mongoose"

const { ObjectId } = Schema.Types

const productSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		discount: Number,
		description: { type: String, required: true },
		store: { type: ObjectId, ref: "Store", required: true },
		category: { type: ObjectId, ref: "Category", required: true },
		reviews: [{ type: ObjectId, ref: "Review" }]
	},
	{ timestamps: true }
)

export default productSchema
