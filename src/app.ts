import express from "express"
import morgan from "morgan"
import cors, { CorsOptions } from "cors"
import cookieParser from "cookie-parser"

const app = express()

const corsOptions: CorsOptions = {
	origin: true,
	credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))

export default app
