import { Schema, Document } from "mongoose"
import { IUser } from "./user"

const { ObjectId } = Schema.Types

export interface IStore extends Document {
	name: string
	location?: string
	description?: string
	manager: IUser["_id"]
	createdAt: string
	updatedAt: string
}

const storeSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		location: String,
		description: String,
		manager: { type: ObjectId, ref: "User", required: true },
		reviews: [{ type: ObjectId, ref: "Review" }]
	},
	{ timestamps: true }
)

export default storeSchema
