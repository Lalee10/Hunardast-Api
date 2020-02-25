import { GraphQLSchema } from "graphql"
import { buildSchemaSync } from "type-graphql"
import { AuthResolver, CategoryResolver, MyStoreResolver } from "./resolvers"

const schema: GraphQLSchema = buildSchemaSync({
	resolvers: [AuthResolver, CategoryResolver, MyStoreResolver],
	emitSchemaFile: true
})

export default schema
