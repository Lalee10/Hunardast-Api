import { Request, Response } from "express"
import { HunardastDB, getDb } from "./components/database/mongoose"
import { verifyAuthToken } from "./helpers/auth"

export type Nullable<T> = T | null

export interface DecodedUser {
	_id: string
	name: string
	email: string
}

export interface ApolloContext {
	req: Request
	res: Response
	db: HunardastDB
	user: Nullable<DecodedUser>
}

export function createApolloContext({ req, res }): ApolloContext {
	const db = getDb()
	const user = verifyAuthToken(req.headers.cookie || "")
	console.log(
		"Request: ",
		user?._id,
		req.headers["user-agent"]?.split(" ")[0],
		req.body?.operationName
	)
	return { req, res, db, user }
}
