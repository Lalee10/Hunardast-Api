import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"
import { IStoreDb } from "./store"

export interface IProductDb extends Document, Timestamp {
	name: string
	price: number
	images: string[]
	discount: number
	category: string
	description: string
	sizes: string[]
	colors: string[]
	store: IStoreDb["_id"]
	renewalType: string
	expiresAt: Date
}

const { ObjectId } = Schema.Types

const productSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		images: { type: [String], default: [] },
		discount: { type: Number, default: 0 },
		category: { type: String, required: true },
		description: { type: String, required: true },
		sizes: { type: [String] },
		colors: { type: [String] },
		store: { type: ObjectId, ref: "Store", required: true },
		renewalType: { type: String, default: "manual" },
		expiresAt: { type: Date },
	},
	{ timestamps: true }
)

export default productSchema
