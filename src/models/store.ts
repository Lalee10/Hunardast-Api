import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"
import { IUserDb } from "./user"

export interface IStoreDb extends Document, Timestamp {
	name: string
	slug: string
	logo: string
	banner: string
	location: string
	tagline: string
	manager: IUserDb["id"]
}

const { ObjectId } = Schema.Types

const storeSchema: Schema = new Schema(
	{
		name: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		logo: { type: String },
		banner: { type: String },
		location: { type: String, required: true },
		tagline: { type: String, required: true, trim: true },
		manager: { type: ObjectId, ref: "User", required: true, unique: true },
	},
	{ timestamps: true }
)

export default storeSchema
