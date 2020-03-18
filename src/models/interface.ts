import { Model, Schema, Document } from "mongoose"
import { IReview } from "./review"
import { IProduct } from "./product"
import { Request, Response } from "express"
import { IUserDb, ICategoryDb, IStoreDb } from "../typings/types"

export interface Timestamp {
	createdAt: Date
	updatedAt: Date
}

export interface CoreDatabase {
	Category: Model<ICategoryDb & Document>
	User: Model<IUserDb & Document>
	Store: Model<IStoreDb & Document>
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

export type ObjectId = Schema.Types.ObjectId
