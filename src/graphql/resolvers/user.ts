import { ObjectType, Field, ID, Resolver, Query, Arg, Ctx } from "type-graphql"
import { CoreDatabase } from "../../models/interface"

// Class for Type-GraphQL usage
@ObjectType()
export class User {
	@Field(type => ID)
	_id: string

	@Field()
	email: string

	@Field()
	name: string

	password: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

@Resolver(User)
export class UserResolver {
	@Query(returns => User, { nullable: true })
	async user(
		@Ctx("db") db: CoreDatabase,
		@Ctx("user") user: Promise<unknown>
		// @Arg("_id", { nullable: true }) _id?: string,
		// @Arg("authzId", { nullable: true }) authzId?: string,
		// @Arg("email", { nullable: true }) email?: string
	): Promise<User | null> {
		const ctxAuthzId: any = await user

		// If no user token found return null
		if (!ctxAuthzId) return null

		const dbUser = await db.User.findOne({ authzId: ctxAuthzId })
	}
}

export default UserResolver
