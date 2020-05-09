import bcrypt from "bcryptjs"
import { ApolloError } from "apollo-server-express"
import { validateEmail, getToken, setAuthCookie, clearAuthCookie } from "../../controllers/auth"
import { IMutationResolvers, IQueryResolvers } from "../../typings/types"
import { UnauthorizedError } from "../../helpers/error"

export const authQueries: IQueryResolvers = {
	verifyUser: async (root, args, ctx) => {
		if (args.required && !ctx.user) {
			throw new UnauthorizedError()
		} else if (!ctx.user) {
			return null
		} else {
			return await ctx.db.User.findById(ctx.user._id)
		}
	},
}

export const authMutations: IMutationResolvers = {
	registerUser: async (root, args, ctx) => {
		const { name, email, password } = args
		const { db, res } = ctx
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
	},
	loginUser: async (root, args, ctx) => {
		const { email, password } = args
		const { db, res } = ctx
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
	},
	logoutUser: (root, args, ctx) => {
		const { res } = ctx
		clearAuthCookie(res)
		return "User logged out successfully"
	},
}
