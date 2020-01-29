import { Schema, Document } from "mongoose"

export interface ICategory extends Document {
	name: string
	createdAt: Date
	updatedAt: Date
}

export const categorySchema: Schema = new Schema(
	{
		name: { type: String, unique: true, required: true }
	},
	{ timestamps: true }
)

export default categorySchema
