import cookie from "cookie"
import jwt from "jsonwebtoken"
import { ApolloError } from "apollo-server-micro"
import { CoreDatabase } from "../models/interface"
import { IUser } from "../typings/types"

const secretKey = `${process.env.HD_SECRET_KEY}`
const authCookieName = "authTokenHD"
const cookieMaxAge = 1000 * 60 * 60 * 24 * 2
const isProduction = process.env.NODE_ENV === "production"

export async function validateEmail(db: CoreDatabase, email: string) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const valid = re.test(String(email).toLowerCase())

	if (!valid) {
		throw new ApolloError("Invalid email address", "INVALID_EMAIL_ERR")
	}

	const emailExists = await db.User.exists({ email })

	if (emailExists) {
		throw new ApolloError(
			"A user with email already exists",
			"DUPLICATE_EMAIL_ERR"
		)
	}
}

export function getToken(user: IUser) {
	const token = jwt.sign({ ...user }, secretKey, {
		audience: "https://api.hunardast.com",
		expiresIn: "2 days",
	})
	return token
}

export function setAuthCookie(req: any, res: any, token: string) {
	const authCookie = cookie.serialize(authCookieName, token, {
		domain: isProduction ? "hunardast-app.now.sh" : "localhost",
		maxAge: cookieMaxAge,
		httpOnly: true,
		sameSite: "none",
		secure: isProduction,
	})
	res.setHeader("Set-Cookie", [authCookie])
}

export function clearAuthCookie(res: any) {
	const authCookie = cookie.serialize(authCookieName, "", {
		domain: isProduction ? "hunardast-app.now.sh" : "localhost",
		maxAge: 0,
		httpOnly: true,
		sameSite: "none",
		secure: isProduction,
	})
	res.setHeader("Set-Cookie", [authCookie])
}

export function verifyAuthToken(cookies: string) {
	try {
		const cookiesExtracted = cookie.parse(cookies)
		const authToken = cookiesExtracted[authCookieName]
		const decoded = jwt.verify(authToken, secretKey)
		if (typeof decoded === "object") {
			return decoded
		} else {
			return null
		}
	} catch (error) {
		return null
	}
}
