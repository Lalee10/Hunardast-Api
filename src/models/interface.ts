import { Model } from "mongoose"
import { ICategory } from "./category"
import { IUser } from "./user"
import { IReview } from "./review"
import { IStore } from "./store"
import { IProduct } from "./product"
import { Request, Response } from "express"

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

export interface DecodedUser {
	_id: string
	name: string
	email: string
}

export type Nullable<T> = T | null

export interface ApolloContext {
	req: Request
	res: Response
	db: CoreDatabase
	user: Nullable<DecodedUser>
}
