import { makeExecutableSchema } from "apollo-server"
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb"
import typeDefs from "./typeDefs"

const schema = makeExecutableSchema({
	typeDefs: [DIRECTIVES, typeDefs],
})

export default schema
