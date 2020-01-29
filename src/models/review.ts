import { Schema, Document } from "mongoose"
import { IUser } from "./user"

export interface IReview extends Document {
	reviewer: IUser["_id"]
	rating: number
	review: string
	editCount: number
	createdAt: Date
	updatedAt: Date
}

const { ObjectId } = Schema.Types

export const reviewSchema = new Schema(
	{
		reviewer: { type: ObjectId, ref: "User" },
		rating: { type: Number, required: true },
		review: { type: String, required: true },
		editCount: { type: Number, default: 0 }
	},
	{ timestamps: true }
)

export default reviewSchema
