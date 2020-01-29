import { Schema, Document } from "mongoose"

export interface IUser extends Document {
	auth0_id: String
	name: String
	email: String
}

const userSchema: Schema = new Schema({
	auth0_id: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true }
})

export default userSchema
