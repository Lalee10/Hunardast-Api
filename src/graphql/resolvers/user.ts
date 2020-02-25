import { ObjectType, Field, ID, Resolver, Query, Arg, Ctx } from "type-graphql"
import { CoreDatabase } from "../../models/interface"

@ObjectType()
export class User {
	@Field(type => ID)
	_id: string

	@Field()
	email: string

	@Field()
	name: string

	@Field(type => [String])
	permissions: string[]

	password: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

@Resolver(User)
export class UserResolver {}

export default UserResolver
