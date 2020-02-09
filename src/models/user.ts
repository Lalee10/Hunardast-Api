import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"

export interface IUser extends Document, Timestamp {
	authzId: String
	name: String
	email: String
	perms: [String]
}

const userSchema: Schema = new Schema(
	{
		authzId: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		perms: { type: [String], required: true }
	},
	{ timestamps: true }
)

export default userSchema
