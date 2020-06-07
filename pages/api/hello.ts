import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
	res.setHeader("Access-Control-Allow-Credentials", "true")
	res.status(200).json({ message: "Hello hello" })
}
