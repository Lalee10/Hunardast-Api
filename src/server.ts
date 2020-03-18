import dotenv from "dotenv"
dotenv.config()
import { ApolloServer } from "apollo-server-express"
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb"
// import serverless from "serverless-http"
import app from "./app"
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
		const user = verifyAuthToken(req)
		console.log("Request: ", user?._id, req.headers["user-agent"]?.split(" ")[0], req.body?.operationName)
		return { req, res, db, user }
	}
})

server.applyMiddleware({ app: app, cors: false })

app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
// export const graphqlHandler = serverless(app)
