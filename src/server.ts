import "reflect-metadata"
import dotenv from "dotenv"
dotenv.config()
import { ApolloServer } from "apollo-server-express"
import app from "./app"
import schema from "./graphql/schema"
import { getDb } from "./models"
import { ApolloContext } from "./models/interface"
import { verifyAuthToken } from "./controllers/auth"

const server = new ApolloServer({
	schema,
	formatError: error => {
		console.log("Error Message: ", error.message)

		return error
	},
	context: ({ req, res }): ApolloContext => {
		const db = getDb()
		const userId = verifyAuthToken(req)

		return { req, res, db, userId }
	}
})

server.applyMiddleware({ app: app, cors: false })

app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
