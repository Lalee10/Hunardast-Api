import { Model, Document } from "mongoose"
import { ICategory } from "./category"
import { IUser } from "./user"
import { IReview } from "./review"
import { IStore } from "./store"
import { IProduct } from "./product"

export interface Timestamp {
	createdAt: Date
	updatedAt: Date
}

export interface CoreDatabase {
	Category: Model<ICategory>
	User: Model<IUser>
	Store: Model<IStore>
	Product: Model<IProduct>
	Review: Model<IReview>
}
