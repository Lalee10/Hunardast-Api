import dotenv from "dotenv"
dotenv.config()
import { ApolloServer } from "apollo-server-express"
import serverless from "serverless-http"
import app from "./app"
import composedSchema from "./graphql/schema"
import { createApolloContext } from "./apollo"

const server = new ApolloServer({
	schema: composedSchema,
	context: createApolloContext,
	playground: {
		endpoint:
			process.env.NODE_ENV === "prdouction"
				? "/prod/graphql"
				: "/dev/graphql",
	},
})

server.applyMiddleware({
	app: app,
	cors: { credentials: true, origin: true },
})

export const graphqlHandler = serverless(app)
