import jwt, { JwtHeader } from "jsonwebtoken"
import jwksClient from "jwks-rsa"

const auth0_aud = `${process.env.AUTH0_AUDIENCE}`
const auth0_iss = `${process.env.AUTH0_ISSUER}`

const client = jwksClient({
	cache: true,
	jwksUri: `https://hunardast.auth0.com/.well-known/jwks.json`
})

const getKey = (header: JwtHeader, callback: Function) => {
	client.getSigningKey(header.kid || "", function(err, key) {
		const signingKey = key.getPublicKey()
		callback(null, signingKey)
	})
}

export const getUserPromise = async (token: string) => {
	if (token) {
		return new Promise<string | null>((resolve, reject) => {
			jwt.verify(
				token,
				getKey,
				{
					audience: auth0_aud,
					issuer: auth0_iss,
					algorithms: ["RS256"]
				},
				(err, decoded) => {
					if (err) reject(err)
					else if (typeof decoded === "object") resolve(decoded["sub"])
					else resolve(null)
				}
			)
		})
	} else {
		return new Promise<string | null>(resolve => {
			resolve(null)
		})
	}
}
