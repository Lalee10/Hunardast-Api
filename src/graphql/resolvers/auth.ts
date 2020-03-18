import bcrypt from "bcryptjs"
import { Response } from "express"
import { ApolloError } from "apollo-server-express"
import { Resolver, Query, Arg, Ctx, Mutation, ObjectType, Field } from "type-graphql"
import { CoreDatabase, ApolloContext } from "../../models/interface"
import { validateEmail, getToken, setAuthCookie, clearAuthCookie } from "../../controllers/auth"
import { UnauthorizedError } from "../../helpers/error"
import { User } from "./user"

@ObjectType()
class BaseUser {
	@Field()
	_id: string

	@Field()
	name: string

	@Field()
	email: string
}

@Resolver()
class AuthResolver {
	@Query(returns => BaseUser, { nullable: true })
	async verifyUser(@Arg("required") required: boolean, @Ctx() ctx: ApolloContext) {
		if (required && !ctx.user) {
			throw new UnauthorizedError()
		} else if (!ctx.user) {
			return null
		} else {
			return ctx.user
		}
	}

	@Mutation(returns => User)
	async loginUser(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx("db") db: CoreDatabase,
		@Ctx("res") res: Response
	) {
		// Check if email is valid
		const user = await db.User.findOne({ email })
		if (!user) throw new ApolloError("Authentication Failed!", "AUTH_FAILED")

		// Check if password is valid
		const encryptedPass = user.password
		const match = await bcrypt.compare(password, encryptedPass)
		if (!match) throw new ApolloError("Authentication Failed!", "AUTH_FAILED")

		// Get the JWT for the user and instruct response to set cookie
		const token = getToken(user)
		setAuthCookie(res, token)

		return user
	}

	@Mutation(returns => String)
	async logoutUser(@Ctx() ctx: ApolloContext, @Ctx("res") res: Response) {
		if (!ctx.user) {
			return "User is not logged in. Logout failed"
		} else {
			clearAuthCookie(res)
			return "User logged out successfully"
		}
	}

	@Mutation(returns => User)
	async registerUser(
		@Arg("name") name: string,
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx("db") db: CoreDatabase,
		@Ctx("res") res: Response
	) {
		// Check if the email is valid and does not already exist
		await validateEmail(db, email)

		// Hash the password using bcrypt-js
		const encryptedPass = await bcrypt.hash(password, 10)

		// Create the user in the db
		const user = await db.User.create({ name, email, password: encryptedPass })

		// Get the JWT for the created user and instruct response to set cookie
		const token = getToken(user)
		setAuthCookie(res, token)

		return user
	}
}

export default AuthResolver
