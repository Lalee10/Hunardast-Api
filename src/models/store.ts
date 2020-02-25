import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"
import { IUser } from "./user"
import { IReview } from "./review"

const { ObjectId } = Schema.Types

export interface IStore extends Document, Timestamp {
	name: string
	location?: string
	description?: string
	manager: IUser["_id"]
	reviews?: [IReview["_id"]]
}

const storeSchema: Schema = new Schema(
	{
		// Unique: A store must have a unique name and slug
		name: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		location: String,
		description: String,
		// Unique: A user can manage only one store
		manager: { type: ObjectId, ref: "User", required: true, unique: true },
		reviews: [{ type: ObjectId, ref: "Review" }]
	},
	{ timestamps: true }
)

export default storeSchema
