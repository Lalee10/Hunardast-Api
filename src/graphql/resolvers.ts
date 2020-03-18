import { GraphQLScalarType } from "graphql"
import { Kind } from "graphql/language"
import { IResolvers } from "../typings/types"
import QueryResolver from "./resolvers/query"
import MutationResolver from "./resolvers/mutation"

const resolvers: IResolvers = {
	Date: new GraphQLScalarType({
		name: "Date",
		description: "A date and time, represented as an ISO-8601 string",
		serialize: value => value.toISOString(),
		parseValue: value => new Date(value),
		parseLiteral: ast => {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value) // ast value is always in string format
			}
			return null
		}
	}),
	Query: QueryResolver,
	Mutation: MutationResolver
}

export default resolvers
