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

function getHost(url: string | null | undefined) {
	let host = (url || "").replace(/^((\w+:)?\/\/[^\/]+\/?).*$/, "$1")
	if (host.endsWith("/")) host = host.substring(0, host.length - 1)
	return host
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	const origin = getHost(req.headers.referer)
	res.setHeader("Access-Control-Allow-Origin", origin)
	res.setHeader("Access-Control-Allow-Credentials", "true")
	if (req.method === "OPTIONS") {
		res.status(200).end()
		return
	}
	return handler(req, res)
}
