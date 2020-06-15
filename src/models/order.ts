import { Schema, Document } from "mongoose"
import { Timestamp } from "./interface"
import { IProductDb } from "./product"
import { IStoreDb } from "./store"
import { IUserDb } from "./user"

interface OrderDetails {
	shippingAddress: string
	billingAddress: string
	contact: string
	paymentMethod: string
	name: string
	email: string
}

export interface IOrderDb extends Document, Timestamp {
	orderNo: number
	amount: number
	quantity: number
	color: string
	size: string
	personalization: string
	details: OrderDetails
	status: "Pending" | "Confirmed" | "Shipping" | "Completed" | "Cancelled"
	verified: boolean
	product: IProductDb["_id"]
	store: IStoreDb["_id"]
	placedBy: IUserDb["_id"]
}

const { ObjectId } = Schema.Types

export const orderSchema: Schema = new Schema(
	{
		orderNo: { type: Number, required: true },
		amount: { type: Number, required: true },
		quantity: { type: Number, required: true },
		color: { type: String, default: "" },
		size: { type: String, default: "" },
		personalization: { type: String, default: "" },
		details: { type: Schema.Types.Mixed },
		status: {
			type: String,
			enum: ["Pending", "Confirmed", "Shipping", "Completed"],
			default: "Pending",
		},
		verified: { type: Boolean, default: false },
		store: { type: ObjectId, required: true, ref: "Store" },
		product: { type: ObjectId, required: true, ref: "Product" },
		placedBy: { type: ObjectId, required: true, ref: "User" },
	},
	{ timestamps: true }
)

export default orderSchema
