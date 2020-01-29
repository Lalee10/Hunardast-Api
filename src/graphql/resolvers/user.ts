import { ObjectType, Field, ID, Resolver, Query, Arg, Mutation } from "type-graphql"
import db from "../../models"

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
}

@Resolver(User)
export class UserResolver {}
