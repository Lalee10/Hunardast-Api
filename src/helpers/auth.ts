import jwt from "jsonwebtoken"

const secretKey = `${process.env.SECRET_KEY}`

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
