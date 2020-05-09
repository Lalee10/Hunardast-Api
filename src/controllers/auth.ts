import jwt from "jsonwebtoken"
import { ApolloError } from "apollo-server"
import { CoreDatabase } from "../models/interface"
import { IUserDb } from "../typings/types"

const secretKey = `${process.env.SECRET_KEY}`
const authCookieName = "authTokenHD"
const loginCookieName = "loggedInHD"
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
		throw new ApolloError("A user with email already exists", "DUPLICATE_EMAIL_ERR")
	}
}

export function getToken(user: IUserDb) {
	const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, secretKey, {
		audience: "https://api.hunardast.com",
		expiresIn: "2 days",
	})
	return token
}

export function setAuthCookie(res: any, token: string) {
	res.cookie(authCookieName, token, { secure: isProduction, maxAge: cookieMaxAge, httpOnly: true })
	res.cookie(loginCookieName, true, { secure: isProduction, maxAge: cookieMaxAge })
}

export function clearAuthCookie(res: any) {
	res.clearCookie(authCookieName)
	res.clearCookie(loginCookieName)
}

export function getCookie(cookies: string, name: string) {
	const arr = cookies.split(";").filter((e) => e.includes(name))
	if (arr.length === 0) return ""
	else return arr[0].split("=")[1].trim()
}

export function verifyAuthToken(cookies: string) {
	try {
		const authToken = getCookie(cookies, "authToken")
		const decoded = jwt.verify(authToken, secretKey)
		if (typeof decoded === "object") {
			return {
				_id: decoded["_id"],
				name: decoded["name"],
				email: decoded["email"],
			}
		} else {
			return null
		}
	} catch (error) {
		return null
	}
}
