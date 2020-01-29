// Load environment variables from .env file
import "reflect-metadata"
import dotenv from "dotenv"
dotenv.config()
import { ApolloServer } from "apollo-server"
import schema from "./graphql/schema"

const server = new ApolloServer({
	schema
})
server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))
