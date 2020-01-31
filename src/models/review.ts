import { Schema } from "mongoose"

const { ObjectId } = Schema.Types

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
