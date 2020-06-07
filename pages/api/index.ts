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
			req.headers.cookie || ""
		) as ApolloContext["user"]
		console.log(process.env.HD_MONGO_URI)
		console.log(
			"Request: ",
			user?._id,
			req.headers["user-agent"]?.split(" ")[0],
			req.headers.referer
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

function getHost(input: string | null | undefined) {
	let host = (input || "").replace(/^((\w+:)?\/\/[^\/]+\/?).*$/, "$1")
	if (host.endsWith("/")) {
		host = host.substring(0, host.length - 1)
	} else if (!host || host.length <= 2) {
		host = "*"
	}
	return host
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const origin = getHost(req.headers.referer)
	console.log("Origin: ", origin)
	// Allow Origins
	res.setHeader("Access-Control-Allow-Origin", origin)
	// Allow Methods
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	// Allow Headers
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, Accept, Content-Type, Authorization"
	)
	// Allow credentials
	res.setHeader("Access-Control-Allow-Credentials", "true")

	if (req.method === "OPTIONS") {
		res.status(200).end()
		return
	}
	return handler(req, res)
}
