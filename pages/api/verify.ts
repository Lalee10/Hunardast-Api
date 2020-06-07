import { NextApiRequest, NextApiResponse } from "next"
import { getDb } from "../../src/models"
import { verifyAuthToken } from "../../src/controllers/auth"
import { ApolloContext } from "../../src/models/interface"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const decoded = verifyAuthToken(req.headers.cookie || "") as ApolloContext["user"]
	const db = getDb()
	const user = await db.User.findById(decoded?._id).populate("store")
	res.status(200).json({ user })
}
