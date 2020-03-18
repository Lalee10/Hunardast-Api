import { GraphQLSchema } from "graphql"
import { buildSchemaSync } from "type-graphql"
import { AuthResolver, CategoryResolver, MyStoreResolver } from "./resolvers"

/**
 * Lambda gonna build schema for each request lead to duplicate GraphQL Declaration
 * so we need to cache the built schema.
 * (this is currently the default cache for type-graphql too)
 * @type {GraphQLSchema}
 */
;(<any>global).cachedSchema =
	(<any>global).cachedSchema ||
	buildSchemaSync({
		resolvers: [AuthResolver, MyStoreResolver]
	})
const schema = (<any>global).cachedSchema

export default schema
