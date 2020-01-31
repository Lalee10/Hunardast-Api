import { Model, Document } from "mongoose"

export interface Timestamp {
	createdAt: Date
	updatedAt: Date
}

export interface CategoryDB extends Document, Timestamp {
	name: string
}

export interface UserDB extends Document, Timestamp {
	auth0_id: String
	name: String
	email: String
}

export interface ReviewDB extends Document, Timestamp {
	reviewer: UserDB["_id"]
	rating: number
	review: string
	editCount: number
}

export interface StoreDB extends Document, Timestamp {
	name: string
	location?: string
	description?: string
	manager: UserDB["_id"]
	reviews?: [ReviewDB["_id"]]
}

export interface ProductDB extends Document, Timestamp {
	name: string
	price: number
	discount?: number
	description: string
	store: StoreDB["_id"]
	category: CategoryDB["_id"]
	reviews?: [ReviewDB["_id"]]
}

export default interface CoreDatabase {
	Category: Model<CategoryDB>
	User: Model<UserDB>
	Store: Model<StoreDB>
	Product: Model<ProductDB>
	Review: Model<ReviewDB>
}
