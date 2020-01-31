import { Schema, Document } from "mongoose"

const { ObjectId } = Schema.Types

const storeSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		location: String,
		description: String,
		manager: { type: ObjectId, ref: "User", required: true },
		reviews: [{ type: ObjectId, ref: "Review" }]
	},
	{ timestamps: true }
)

export default storeSchema
