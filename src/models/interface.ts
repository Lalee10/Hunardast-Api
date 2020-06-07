import { Model, Schema, Document } from "mongoose"
import { Request, Response } from "express"
import { IUserDb } from "./user"
import { IStoreDb } from "./store"
import { IProductDb } from "./product"
import { IReviewDb } from "./review"
import { IUser } from "../typings/types"

export interface Timestamp {
	createdAt: Date
	updatedAt: Date
}

export interface CoreDatabase {
	User: Model<IUserDb & Document>
	Store: Model<IStoreDb & Document>
	Product: Model<IProductDb & Document>
	Review: Model<IReviewDb & Document>
}

export type Nullable<T> = T | null

export interface ApolloContext {
	req: Request
	res: Response
	db: CoreDatabase
	user: Nullable<IUser>
}

export type ObjectId = Schema.Types.ObjectId
