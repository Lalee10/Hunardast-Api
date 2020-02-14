import express from "express"
import morgan from "morgan"
import cors, { CorsOptions } from "cors"
import cookieParser from "cookie-parser"

const app = express()

const whitelist = ["http://localhost:4000", "http://localhost:3000", "http://hunardast.com", "https://hunardast.com"]

const corsOptions: CorsOptions = {
	origin: function(origin, callback) {
		if (whitelist.includes(`${origin}`) || !origin) {
			callback(null, true)
		} else {
			callback(new Error("Not allowed by CORS"))
		}
	},
	credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))

export default app
