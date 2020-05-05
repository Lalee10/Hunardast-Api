import { Schema } from "mongoose"

const { ObjectId } = Schema.Types

const storeSchema: Schema = new Schema(
	{
		name: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		banner: { type: String },
		image: { type: String },
		location: { type: String, required: true },
		tagline: { type: String, required: true, trim: true },
		manager: { type: ObjectId, ref: "User", required: true, unique: true },
	},
	{ timestamps: true }
)

export default storeSchema
