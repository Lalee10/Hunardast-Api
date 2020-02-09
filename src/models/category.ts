import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"

export interface ICategory extends Document, Timestamp {
	name: string
	slug: string
	parent: string
}

export const categorySchema: Schema = new Schema(
	{
		name: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		parent: { type: String, required: true, trim: true }
	},
	{ timestamps: true }
)

export default categorySchema
