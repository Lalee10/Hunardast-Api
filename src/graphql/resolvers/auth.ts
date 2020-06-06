import bcrypt from "bcryptjs"
import { ApolloError } from "apollo-server-micro"
import { validateEmail, getToken, setAuthCookie, clearAuthCookie } from "../../controllers/auth"
import { IMutationResolvers, IQueryResolvers, IUser } from "../../typings/types"
import { UnauthorizedError } from "../../helpers/error"

export const authQueries: IQueryResolvers = {
	verifyUser: async (root, args, ctx) => {
		if (args.required && !ctx.user) {
			throw new UnauthorizedError()
		} else if (!ctx.user) {
			return null
		} else {
			const user = await ctx.db.User.findById(ctx.user._id).lean()
			const store = await ctx.db.Store.findById(user.store).lean()
			return { ...user, store }
		}
	},
}

export const authMutations: IMutationResolvers = {
	registerUser: async (root, args, ctx) => {
		const { name, email, password } = args
		const { db, res } = ctx

		await validateEmail(db, email)

		const encryptedPass = await bcrypt.hash(password, 10)
		const created = await db.User.create({ name, email, password: encryptedPass })

		// Get the JWT for the created user and instruct response to set cookie
		const token = getToken(created)
		setAuthCookie(ctx.req, res, token)

		const user = await ctx.db.User.findById(created._id).lean()
		const store = await ctx.db.Store.findById(user.store).lean()
		return { ...user, store }
	},
	loginUser: async (root, args, ctx) => {
		const { email, password } = args
		const { db, res } = ctx
		// Check if email is valid
		const user = await db.User.findOne({ email }).lean()
		if (!user) throw new ApolloError("Authentication Failed!", "AUTH_FAILED")

		// Check if password is valid
		const encryptedPass = user.password
		const match = await bcrypt.compare(password, encryptedPass)
		if (!match) throw new ApolloError("Authentication Failed!", "AUTH_FAILED")

		// Get the JWT for the user and instruct response to set cookie
		const token = getToken(user)
		setAuthCookie(ctx.req, res, token)

		const store = await ctx.db.Store.findById(user.store).lean()
		return { ...user, store }
	},
	logoutUser: (root, args, ctx) => {
		const { res } = ctx
		clearAuthCookie(res)
		return "User logged out successfully"
	},
}
