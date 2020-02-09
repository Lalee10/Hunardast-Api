import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"
import { IUser } from "./user"

const { ObjectId } = Schema.Types

export interface IReview extends Document, Timestamp {
	reviewer: IUser["_id"]
	rating: number
	review: string
	editCount: number
}

export const reviewSchema: Schema = new Schema(
	{
		reviewer: { type: ObjectId, ref: "User", required: true },
		rating: { type: Number, required: true },
		review: { type: String, required: true },
		editCount: { type: Number, default: 0 }
	},
	{ timestamps: true }
)

export default reviewSchema
