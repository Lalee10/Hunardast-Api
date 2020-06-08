import bcrypt from "bcryptjs"
import { ApolloError } from "apollo-server-micro"
import {
	validateEmail,
	getToken,
	setAuthCookie,
	clearAuthCookie,
} from "../../controllers/auth"
import {
	IMutationResolvers,
	IQueryResolvers,
	IUser,
	IStore,
} from "../../typings/types"
import { UnauthorizedError } from "../../helpers/error"
import { IUserDb } from "../../models/user"
import { IStoreDb } from "../../models/store"

function authResponseUser(
	user: IUser | IUserDb,
	store: IStore | IStoreDb | null
): IUser {
	return {
		__typename: "User",
		_id: user._id,
		email: user.email,
		name: user.name,
		permissions: user.permissions,
		store: store,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	}
}

export const authQueries: IQueryResolvers = {
	verifyUser: async (root, args, ctx) => {
		if (args.required && !ctx.user) {
			throw new UnauthorizedError()
		} else if (!ctx.user) {
			return null
		} else {
			return ctx.user
		}
	},
}

export const authMutations: IMutationResolvers = {
	registerUser: async (root, args, ctx) => {
		const { name, email, password } = args
		const { db } = ctx

		await validateEmail(db, email)

		const encryptedPass = await bcrypt.hash(password, 10)
		const created = await db.User.create({
			name,
			email,
			password: encryptedPass,
		})

		const store = await ctx.db.Store.findById(created.store).lean()
		const authUser = authResponseUser(created, store)

		const token = getToken(authUser)
		return { user: authUser, token }
	},
	loginUser: async (root, args, ctx) => {
		const { email, password } = args
		const { db } = ctx

		// Check if email is valid
		const user = await db.User.findOne({ email })
		if (!user) throw new ApolloError("Authentication Failed!", "AUTH_FAILED")

		// Check if password is valid
		const encryptedPass = user.password
		const match = await bcrypt.compare(password, encryptedPass)
		if (!match) throw new ApolloError("Authentication Failed!", "AUTH_FAILED")

		const store = await ctx.db.Store.findById(user.store).lean()
		const authUser = authResponseUser(user, store)

		const token = getToken(authUser)
		return { user: authUser, token }
	},
	logoutUser: (root, args, ctx) => {
		const { req, res } = ctx
		clearAuthCookie(req, res)
		return "User logged out successfully"
	},
}
