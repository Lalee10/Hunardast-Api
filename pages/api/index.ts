import { ApolloServer } from "apollo-server-micro"
import { NextApiRequest, NextApiResponse } from "next"
import typeDefs from "../../src/graphql/typeDefs"
import resolvers from "../../src/graphql/resolvers"
import { getDb } from "../../src/models"
import { ApolloContext } from "../../src/models/interface"
import { verifyAuthToken } from "../../src/controllers/auth"

const apolloServer = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	context: ({ req, res }): ApolloContext => {
		const db = getDb()
		const user = verifyAuthToken(
			req.headers.authorization || ""
		) as ApolloContext["user"]

		console.log(
			"Request: ",
			user?._id,
			req.headers["user-agent"]?.split(" ")[0]
		)

		return { req, res, db, user }
	},
	playground: true,
	introspection: true,
})

const handler = apolloServer.createHandler({
	path: "/api",
})

export const config = {
	api: {
		bodyParser: false,
	},
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	// Allow Origins
	res.setHeader("Access-Control-Allow-Origin", "*")
	// Allow Methods
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	// Allow Headers
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, Accept, Content-Type, Authorization"
	)

	if (req.method === "OPTIONS") {
		res.status(200).end()
		return
	}
	return handler(req, res)
}
