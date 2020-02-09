import "reflect-metadata"
import dotenv from "dotenv"
dotenv.config()
import { ApolloServer } from "apollo-server-express"
import app from "./app"
import schema from "./graphql/schema"
import { getDb } from "./models"
import { getUserPromise } from "./middlewares/auth"
import { CoreDatabase } from "./models/interface"

interface ApolloContext {
	db: CoreDatabase
	user: Promise<string | null>
}

const server = new ApolloServer({
	schema,
	formatError: error => {
		console.log(error)

		return error
	},
	context: ({ req, res }): ApolloContext => {
		const token = req.headers.authorization?.split(" ")[1] || ""
		const user = getUserPromise(token)

		return {
			db: getDb(),
			user: user
		}
	}
})

server.applyMiddleware({ app: app, cors: false })

app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
