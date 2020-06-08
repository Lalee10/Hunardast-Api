import { GraphQLScalarType } from "graphql"
import { GraphQLJSON, GraphQLJSONObject } from "graphql-type-json"
import { Kind } from "graphql/language"
import { IResolvers } from "../typings/types"
import QueryResolver from "./resolvers/query"
import MutationResolver from "./resolvers/mutation"

const resolvers: IResolvers = {
	JSON: GraphQLJSON,
	JSONObject: GraphQLJSONObject,
	Date: new GraphQLScalarType({
		name: "Date",
		description: "A date and time, represented as an ISO-8601 string",
		serialize: (value) => {
			if (typeof value === "string") value = new Date(value)
			return value.toISOString()
		},
		parseValue: (value: string) => new Date(value),
		parseLiteral: (ast: any) => {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value) // ast value is always in string format
			}
			return null
		},
	}),
	Query: QueryResolver,
	Mutation: MutationResolver,
}

export default resolvers
