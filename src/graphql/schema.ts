import { GraphQLSchema } from "graphql"
import { buildSchemaSync } from "type-graphql"
import { CategoryResolver, AuthResolver } from "./resolvers"

const schema: GraphQLSchema = buildSchemaSync({
	resolvers: [CategoryResolver, AuthResolver],
	emitSchemaFile: true
})

export default schema
