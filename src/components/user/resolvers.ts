import bcrypt from "bcryptjs"
import { ApolloError } from "apollo-server-express"
import { UserModel } from "./schema"
import { getToken, setAuthCookie, clearAuthCookie } from "./controllers"
import { validateEmailPattern } from "./controllers"
import errCodes from "../error/codes"

export async function loginResolver({ source, args, context, info }) {
	const { email, password } = args
	const { res } = context

	const user = await UserModel.findOne({ email })
	if (!user) {
		throw new ApolloError(
			"Authentication Failed!",
			errCodes.invalidCredentials
		)
	}

	const encryptedPass = user.password
	const match = await bcrypt.compare(password, encryptedPass)
	if (!match) {
		throw new ApolloError(
			"Authentication Failed!",
			errCodes.invalidCredentials
		)
	}

	const token = getToken(user)
	setAuthCookie(res, token)

	return user
}

export async function registerResolver({ source, args, context, info }) {
	const { name, email, password } = args
	const { db, res } = context

	const valid = validateEmailPattern(email)
	if (!valid) {
		throw new ApolloError("Invalid email address", errCodes.invalidInput)
	}

	const emailExists = await db.User.exists({ email })
	if (emailExists) {
		throw new ApolloError(
			"A user with email already exists",
			errCodes.duplicateEntity
		)
	}

	const encryptedPass = await bcrypt.hash(password, 10)

	const user = await db.User.create({ name, email, password: encryptedPass })

	const token = getToken(user)
	setAuthCookie(res, token)

	return user
}

export function logoutResolver({ source, args, context, info }) {
	const { res } = context
	clearAuthCookie(res)
	return true
}

export async function verifyUser({ source, args, context, info }) {
	if (args.required && !context.user) {
		throw new Error("Invalid authorization!")
	} else if (!context.user) {
		return null
	} else {
		return await context.db.User.findById(context.user._id)
	}
}
