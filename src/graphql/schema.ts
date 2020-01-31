import { GraphQLSchema } from "graphql"
import { buildSchemaSync } from "type-graphql"
import { CategoryResolver } from "./resolvers"

const schema: GraphQLSchema = buildSchemaSync({
	resolvers: [CategoryResolver],
	emitSchemaFile: true
})

export default schema
