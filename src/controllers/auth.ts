import jwt from "jsonwebtoken"
import { ApolloError } from "apollo-server-express"
import { CoreDatabase } from "../models/interface"
import { IUser } from "../models/user"
import { Response, Request } from "express"

const secretKey = `${process.env.SECRET_KEY}`
const authCookieName = "authTokenHD"

export async function validateEmail(db: CoreDatabase, email: string) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const valid = re.test(String(email).toLowerCase())

	if (!valid) {
		throw new ApolloError("Invalid email address", "INVALID_EMAIL_ERR")
	}

	const emailExists = await db.User.exists({ email })

	if (emailExists) {
		throw new ApolloError("A user with email already exists", "DUPLICATE_EMAIL_ERR")
	}
}

export function getToken(user: IUser) {
	const token = jwt.sign({ email: user.email, _id: user._id }, secretKey, {
		audience: "https://api.hunardast.com",
		expiresIn: "2 days"
	})
	return token
}

export function setAuthCookie(res: Response, token: string) {
	res.cookie(authCookieName, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 1000 * 60 * 60 * 24 * 2
	})
}

export function clearAuthCookie(res: Response) {
	res.clearCookie(authCookieName)
}

export function verifyAuthToken(req: Request) {
	try {
		const authToken = req.cookies[authCookieName]
		const decoded = jwt.verify(authToken, secretKey)
		if (typeof decoded === "object") {
			return decoded["_id"]
		} else {
			return null
		}
	} catch (error) {
		return null
	}
}
