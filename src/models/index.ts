import mongoose from "mongoose"

const DB_STRING = `${process.env.DB_STRING}`

mongoose.connect(DB_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

export default mongoose
