import bcrypt from "bcrypt"
import { Response } from "express"
import { ApolloError } from "apollo-server-express"
import { Resolver, Query, Arg, Ctx, Mutation, Field, ObjectType } from "type-graphql"
import { CoreDatabase } from "../../models/interface"
import { User } from "./user"
import { validateEmail, getToken, setCookie } from "../../controllers/auth"

export class UnauthorizedError extends Error {
	statusCode: number

	constructor(statusCode = 401, message = "User authentication required but failed") {
		super(message)
		this.statusCode = statusCode
	}
}

@ObjectType()
abstract class AuthResponse {
	@Field(type => User)
	user: User

	@Field()
	token: string
}

@Resolver()
class AuthResolver {
	@Query(returns => [User], { nullable: "items" })
	async users(@Ctx("db") db: CoreDatabase) {
		return await db.User.find()
	}

	@Query(returns => User, { nullable: true })
	async verifyUser(
		@Arg("required") required: boolean,
		@Ctx("userId") userId: string,
		@Ctx("db") db: CoreDatabase,
		@Ctx("res") res: Response
	) {
		if (required && !userId) {
			throw new UnauthorizedError()
		} else if (!userId) {
			return null
		} else {
			return await db.User.findById(userId)
		}
	}

	@Mutation(returns => AuthResponse)
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
		setCookie(res, token, "authToken")

		return { user, token }
	}

	@Mutation(returns => AuthResponse)
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
		setCookie(res, token, "authToken")

		return { user, token }
	}
}

export default AuthResolver
