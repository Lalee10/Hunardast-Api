import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"
import { IUser } from "./user"

const { ObjectId } = Schema.Types

export interface IStore extends Document, Timestamp {
	name: string
	slug: string
	banner?: string[]
	image?: string
	location?: string
	tagline: string
	manager: IUser["_id"]
}

const storeSchema: Schema = new Schema(
	{
		// Unique: A store must have a unique name and slug
		name: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		banner: [{ type: String }],
		image: String,
		location: { type: String, required: true },
		tagline: String,
		// Unique: A user can manage only one store
		manager: { type: ObjectId, ref: "User", required: true, unique: true }
	},
	{ timestamps: true }
)

export default storeSchema
