import { GraphQLSchema } from "graphql"
import { buildSchemaSync } from "type-graphql"
import { CategoryResolver, UserResolver } from "./resolvers"

const schema: GraphQLSchema = buildSchemaSync({
	resolvers: [CategoryResolver, UserResolver],
	emitSchemaFile: true
})

export default schema
