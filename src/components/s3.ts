import AWS from "aws-sdk"

const s3 = new AWS.S3({
	region: "ap-south-1",
	signatureVersion: "v4",
})

export async function getSignedUrl(fileName: string, fileType: string) {
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

export default s3
