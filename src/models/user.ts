import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"

export interface IUser extends Document, Timestamp {
	name: string
	email: string
	password: string
	permissions: string[]
}

const userSchema: Schema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, trim: true, lowercase: true },
		password: { type: String, required: true },
		permissions: { type: String, lowercase: true, trim: true }
	},
	{ timestamps: true }
)

export default userSchema
