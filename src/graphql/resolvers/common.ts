import { IMutationResolvers } from "../../typings/types"
import s3 from "../../helpers/s3"

export const commonMutations: IMutationResolvers = {
	getSignedUrl: async (root, args, ctx) => {
		const { fileName, fileType } = args
		const s3Bucket = "hunardast"
		const params = {
			Bucket: s3Bucket,
			Key: fileName,
			Expires: 60 * 2,
			ContentType: fileType,
			ACL: "public-read",
		}

		const signedRequest = await s3.getSignedUrlPromise("putObject", params)
		const url = signedRequest.split("?")[0]

		return { signedRequest, url }
	},
}
