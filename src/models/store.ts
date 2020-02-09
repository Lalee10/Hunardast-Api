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
		name: { type: String, required: true },
		location: String,
		description: String,
		manager: { type: ObjectId, ref: "User", required: true },
		reviews: [{ type: ObjectId, ref: "Review" }]
	},
	{ timestamps: true }
)

export default storeSchema
