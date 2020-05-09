import express from "express"
import cors from "cors"

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: "10mb" }))

export default app
