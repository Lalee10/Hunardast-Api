import cookie from "cookie"
import jwt from "jsonwebtoken"
import { ApolloError } from "apollo-server-micro"
import { CoreDatabase } from "../models/interface"
import { IUser } from "../typings/types"

const secretKey = `${process.env.HD_SECRET_KEY}`
const authCookieName = "authTokenHD"
const cookieMaxAge = 60 * 60 * 24 * 2
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
	const token = jwt.sign(user, secretKey, {
		audience: "https://api.hunardast.com",
		expiresIn: "2 days",
	})
	return token
}

function getBaseUrl(origin: string) {
	const base = origin
		.replace("http://", "")
		.replace("https://", "")
		.split(":")[0]
		.split(".")
		.splice(-2)
		.join(".")
	console.log("Base origin: ", base)
	return base
}

export function setAuthCookie(req: any, res: any, token: string) {
	const domain = getBaseUrl(req.headers.origin)
	const authCookie = cookie.serialize(authCookieName, token, {
		domain: domain,
		maxAge: cookieMaxAge,
		httpOnly: true,
		sameSite: "none",
		secure: isProduction && domain !== "localhost",
	})
	console.log("Auth cookie", authCookie)
	res.setHeader("Set-Cookie", [authCookie])
}

export function clearAuthCookie(req: any, res: any) {
	const domain = getBaseUrl(req.headers.origin)
	const authCookie = cookie.serialize(authCookieName, "", {
		domain: domain,
		maxAge: 0,
		httpOnly: true,
		sameSite: "none",
		secure: isProduction && domain !== "localhost",
	})
	res.setHeader("Set-Cookie", [authCookie])
}

export function verifyAuthToken(authHeaders: string) {
	try {
		const splitBearer = authHeaders.split("Bearer ")
		const authToken = splitBearer[1]
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
