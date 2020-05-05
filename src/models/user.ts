import { Schema } from "mongoose"

const userSchema: Schema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, trim: true, lowercase: true },
		password: { type: String, required: true },
		permissions: { type: String, lowercase: true, trim: true },
	},
	{ timestamps: true }
)

export default userSchema
