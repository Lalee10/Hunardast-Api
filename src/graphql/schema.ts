import { GraphQLSchema } from "graphql"
import { buildSchemaSync } from "type-graphql"
import { CategoryResolver } from "./resolvers"

const schema: GraphQLSchema = buildSchemaSync({ validate: false, resolvers: [CategoryResolver] })

export default schema
