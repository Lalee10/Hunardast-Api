import { Schema } from "mongoose"

const { ObjectId } = Schema.Types

const storeSchema: Schema = new Schema(
	{
		// Unique: A store must have a unique name and slug
		name: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		banner: String,
		image: String,
		location: { type: String, required: true },
		tagline: String,
		// Unique: A user can manage only one store
		manager: { type: ObjectId, ref: "User", required: true, unique: true },
	},
	{ timestamps: true }
)

export default storeSchema
