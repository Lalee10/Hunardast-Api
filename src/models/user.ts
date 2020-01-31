import { Schema } from "mongoose"

const userSchema: Schema = new Schema(
	{
		auth0_id: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		email: { type: String, required: true }
	},
	{ timestamps: true }
)

export default userSchema
