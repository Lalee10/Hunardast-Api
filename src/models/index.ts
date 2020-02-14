import mongoose from "mongoose"
import { CoreDatabase } from "./interface"
import categorySchema from "./category"
import userSchema from "./user"
import productSchema from "./product"
import reviewSchema from "./review"
import storeSchema from "./store"

const DB_STRING = `${process.env.DB_STRING}`

const connectionOpts = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
	dbName: "hunardast"
}

const databases: Record<string, CoreDatabase> = {}

export const getDb = (dbName = "hunardast"): CoreDatabase => {
	if (databases[dbName]) {
		return databases[dbName]
	} else {
		const conn = mongoose.createConnection(DB_STRING, { ...connectionOpts, dbName })
		const db: CoreDatabase = {
			Category: conn.model("Category", categorySchema),
			Product: conn.model("Product", productSchema),
			Review: conn.model("Review", reviewSchema),
			Store: conn.model("Store", storeSchema),
			User: conn.model("User", userSchema)
		}
		databases[dbName] = db
		return db
	}
}

export default mongoose
