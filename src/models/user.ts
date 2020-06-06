import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"
import { IStore } from "../typings/types"

export interface IUserDb extends Document, Timestamp {
	name: string
	email: string
	password: string
	permissions: string[]
	store: IStore | string | null
}

const userSchema: Schema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, trim: true, lowercase: true },
		password: { type: String, required: true },
		permissions: { type: [String], requried: true, default: [], lowercase: true, trim: true },
		store: { type: Schema.Types.ObjectId, ref: "Store", default: null },
	},
	{ timestamps: true }
)

export default userSchema
