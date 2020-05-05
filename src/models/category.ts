import { Schema } from "mongoose"

export const categorySchema: Schema = new Schema(
	{
		name: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		level: { type: Number, max: 4, min: 0, default: 0 },
	},
	{ timestamps: true }
)

export default categorySchema
