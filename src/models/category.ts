import { Schema } from "mongoose"

export const categorySchema: Schema = new Schema(
	{
		name: { type: String, required: true, unique: true }
	},
	{ timestamps: true }
)

export default categorySchema
