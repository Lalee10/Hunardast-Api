import mongoose, { Connection } from "mongoose"
import { CoreDatabase } from "./interface"
import categorySchema from "./category"
import userSchema from "./user"
import productSchema from "./product"
import reviewSchema from "./review"
import storeSchema from "./store"

const DB_STRING = `${process.env.DB_STRING}`

mongoose.connect(DB_STRING, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
	dbName: "hunardast"
})

// Create a factory method to get database models using a connection
// By default the mongoose default connection is used but a custom connection
// may also be passed in order to get a use dataabse
export const getDb = (conn: Connection = mongoose.connection): CoreDatabase => ({
	Category: conn.model("Category", categorySchema),
	Product: conn.model("Product", productSchema),
	Review: conn.model("Review", reviewSchema),
	Store: conn.model("Store", storeSchema),
	User: conn.model("User", userSchema)
})

export default mongoose
