import mongoose from "mongoose"
import categorySchema, { ICategory } from "./category"
import userSchema, { IUser } from "./user"
import reviewSchema, { IReview } from "./review"
import storeSchema, { IStore } from "./store"
import productSchema, { IProduct } from "./product"

const DB_STRING = `${process.env.DB_STRING}`

mongoose.connect(DB_STRING, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
})

export default {
	mongoose: mongoose,
	User: mongoose.model<IUser>("User", userSchema),
	Category: mongoose.model<ICategory>("Category", categorySchema),
	Store: mongoose.model<IStore>("Store", storeSchema),
	Review: mongoose.model<IReview>("Review", reviewSchema),
	Product: mongoose.model<IProduct>("Product", productSchema)
}
