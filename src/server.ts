import dotenv from "dotenv"
dotenv.config()
import { ApolloServer } from "apollo-server"
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb"
import { getDb } from "./models"
import { ApolloContext } from "./models/interface"
import { verifyAuthToken } from "./controllers/auth"
import typeDefs from "./graphql/typeDefs"
import resolvers from "./graphql/resolvers"

const server = new ApolloServer({
	typeDefs: [DIRECTIVES, typeDefs],
	resolvers: resolvers,
	context: ({ req, res }): ApolloContext => {
		const db = getDb()
		const user = verifyAuthToken(req.headers.cookie || "")
		console.log("Request: ", user?._id, req.headers["user-agent"]?.split(" ")[0], req.body?.operationName)
		return { req, res, db, user }
	},
	cors: { origin: true, credentials: true },
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`)
})
