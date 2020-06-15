import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"
import { IStore } from "../typings/types"

export interface Profile {
	contact: string
	billingAddress: string
	shippingAddress: string
	profilePicture: string
}

export interface IUserDb extends Document, Timestamp {
	name: string
	email: string
	password: string
	permissions: string[]
	store: IStore | string | null
	cart: any
	profile: Profile
}

const userSchema: Schema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: { type: String, required: true },
		permissions: {
			type: [String],
			requried: true,
			default: [],
			lowercase: true,
			trim: true,
		},
		store: { type: Schema.Types.ObjectId, ref: "Store", default: null },
		cart: { type: [Schema.Types.Mixed], default: [] },
		profile: {
			contact: { type: String, default: "" },
			billingAddress: { type: String, default: "" },
			shippingAddress: { type: String, default: "" },
			profilePicture: { type: String, default: "" },
		},
	},
	{ timestamps: true }
)

export default userSchema
