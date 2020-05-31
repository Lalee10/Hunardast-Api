import { ApolloServer } from "apollo-server-micro"
import microCors from "micro-cors"
import typeDefs from "../../src/graphql/typeDefs"
import resolvers from "../../src/graphql/resolvers"
import { getDb } from "../../src/models"
import { ApolloContext } from "../../src/models/interface"
import { verifyAuthToken } from "../../src/controllers/auth"

const apolloServer = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	playground: process.env.NODE_ENV !== "production",
	context: ({ req, res }): ApolloContext => {
		const db = getDb()
		const user = verifyAuthToken(req.headers.cookie || "")
		console.log("Request: ", user?._id, req.headers["user-agent"]?.split(" ")[0], req.body?.operationName)
		return { req, res, db, user }
	},
})

const handler = apolloServer.createHandler({
	path: "/api",
})

export const config = {
	api: {
		bodyParser: false,
	},
}

const cors = microCors({
	origin: "http://localhost:3000",
})

export default cors((req, res) => {
	if (req.method === "OPTIONS") {
		res.end()
		return
	}
	return handler(req, res)
})
