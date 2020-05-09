import jwt from "jsonwebtoken"
import { Response } from "express"

const secretKey = `${process.env.SECRET_KEY}`
const authCookieName = "authTokenHD"
const loginCookieName = "loggedInHD"
const cookieMaxAge = 1000 * 60 * 60 * 24 * 2
const isProduction = process.env.NODE_ENV === "production"

export function getToken(user: any) {
	const token = jwt.sign(
		{ _id: user._id, name: user.name, email: user.email },
		secretKey,
		{ audience: "https://api.hunardast.com", expiresIn: "2 days" }
	)
	return token
}

export function setAuthCookie(res: Response, token: string) {
	res.cookie(authCookieName, token, {
		secure: isProduction,
		maxAge: cookieMaxAge,
		httpOnly: true,
	})
	res.cookie(loginCookieName, true, {
		secure: isProduction,
		maxAge: cookieMaxAge,
	})
}

export function clearAuthCookie(res: Response) {
	res.clearCookie(authCookieName)
	res.clearCookie(loginCookieName)
}

export function validateEmailPattern(email: string) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}
