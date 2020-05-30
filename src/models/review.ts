import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"
import { IProductDb } from "./product"
import { IUserDb } from "./user"

export interface IReviewDb extends Document, Timestamp {
	reviewer: IUserDb["_id"]
	product: IProductDb["_id"]
	rating: number
	review: string
	editCount: number
}

const { ObjectId } = Schema.Types

export const reviewSchema: Schema = new Schema(
	{
		reviewer: { type: ObjectId, ref: "User", required: true },
		product: { type: ObjectId, ref: "Product", required: true },
		rating: { type: Number, required: true },
		review: { type: String, required: true },
		editCount: { type: Number, default: 0 },
	},
	{ timestamps: true }
)

export default reviewSchema
