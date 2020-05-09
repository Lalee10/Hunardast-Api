import s3 from "./s3"

export async function signedUrlResolver(variables) {
	console.log(variables)
	const { source, args, context, info } = variables
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
}
