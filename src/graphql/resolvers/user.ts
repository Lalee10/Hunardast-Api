import { ObjectType, Field, ID, Resolver, Query, Arg, Mutation } from "type-graphql"

// Class for Type-GraphQL usage
@ObjectType()
export class User {
	@Field(type => ID)
	_id: string

	@Field({ description: "The user_id registered with auth0" })
	auth0_id: string

	@Field()
	name: string

	@Field()
	email: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

@Resolver(User)
export class UserResolver {}
