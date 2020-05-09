import dotenv from "dotenv"
console.time("startup")
dotenv.config()
import { ApolloServer } from "apollo-server-express"
import app from "./app"
import { createApolloContext } from "./apollo"
import composedSchema from "./graphql/schema"

const server = new ApolloServer({
	schema: composedSchema,
	context: createApolloContext,
	playground: {
		endpoint: "/graphql",
	},
})

server.applyMiddleware({
	app: app,
	cors: { credentials: true, origin: true },
})

app.listen({ port: process.env.PORT || 4000 }, () => {
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
	console.timeEnd("startup")
})
