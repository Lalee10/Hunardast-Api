import { Schema, Document } from "mongoose"
import { IStore } from "./store"
import { ICategory } from "./category"
import { IReview } from "./review"
import { Timestamp } from "./interface"

const { ObjectId } = Schema.Types

export interface IProduct extends Document, Timestamp {
	name: string
	price: number
	discount?: number
	description: string
	store: IStore["_id"]
	category: ICategory["_id"]
	reviews?: [IReview["_id"]]
}

const productSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		image: { type: String, required: true },
		discount: Number,
		description: { type: String, required: true },
		store: { type: ObjectId, ref: "Store", required: true },
		category: { type: ObjectId, ref: "Category", required: true },
		reviews: [{ type: ObjectId, ref: "Review" }]
	},
	{ timestamps: true }
)

export default productSchema
