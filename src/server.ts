// Load environment variables from .env file
import "reflect-metadata"
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { ApolloServer } from "apollo-server-express"
import schema from "./graphql/schema"
import CoreDatabase from "./models/interface"
import { getDb } from "./models"

const app = express()

interface ApolloContext {
	db: CoreDatabase
}

const server = new ApolloServer({
	schema,
	context: (): ApolloContext => ({
		db: getDb()
	})
})

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

server.applyMiddleware({ app: app })

app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
