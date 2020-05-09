import mongoose, { Document, Model } from "mongoose"
import { ICategory, CategoryModel } from "../category/schema"
import { IUser, UserModel } from "../user/schema"
import { IStore, StoreModel } from "../store/schema"
import { IProduct, ProductModel } from "../product/schema"
import { IReview, ReviewModel } from "../review/schema"

export interface HunardastDB {
	Category: Model<ICategory & Document>
	User: Model<IUser & Document>
	Store: Model<IStore & Document>
	Product: Model<IProduct & Document>
	Review: Model<IReview & Document>
}

const DB_STRING = `${process.env.DB_STRING}`

const connectionOpts = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
	dbName: "hunardast",
}

mongoose.connect(DB_STRING, connectionOpts)

export const getDb = () => ({
	Category: CategoryModel,
	Product: ProductModel,
	Review: ReviewModel,
	Store: StoreModel,
	User: UserModel,
})

export default mongoose
