import { ApolloServer, gql } from "apollo-server"
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	type Query {
		hello: String
	}
`

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		hello: () => "Hello world!"
	}
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))
