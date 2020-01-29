import { Schema, Document } from "mongoose"
import { IStore } from "./store"
import { ICategory } from "./category"
import { IReview } from "./review"

export interface IProduct extends Document {
	name: string
	price: number
	discount?: number
	description: string
	store: IStore["_id"]
	category: ICategory["_id"]
	reviews?: [IReview["_id"]]
	createdAt: Date
	updatedAt: Date
}

const { ObjectId } = Schema.Types

const productSchema = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	discount: Number,
	description: { type: String, required: true },
	store: { type: ObjectId, ref: "Store", required: true },
	category: { type: ObjectId, ref: "Category", required: true },
	reviews: [{ type: ObjectId, ref: "Review" }]
})

export default productSchema
