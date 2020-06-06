import { NextApiRequest, NextApiResponse } from "next"
import { getDb } from "../../src/models"
import { verifyAuthToken } from "../../src/controllers/auth"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const decoded = verifyAuthToken(req.headers.cookie || "")
	const db = getDb()
	const user = await db.User.findById(decoded._id).populate("store")
	res.status(200).json({ user })
}
