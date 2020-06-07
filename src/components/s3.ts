import AWS from "aws-sdk"
import { logError, logInfo } from "./loggers"

const s3 = new AWS.S3({
	region: "ap-south-1",
	signatureVersion: "v4",
})
const s3BucketName = "hunardast"

export async function s3DeleteObjects(keys: string[]) {
	const keysObject = keys.map((key) => ({ Key: key }))

	s3.deleteObjects({ Bucket: s3BucketName, Delete: { Objects: keysObject } }, function (err, data) {
		if (err) logError(`Failed to deleted file ${err} | ${keys}`)
		else if (data) logInfo(`Following files delete from S3: ${data.Deleted.map((e) => e.Key)}`)
	})
}

export async function getSignedUrl(fileName: string, fileType: string) {
	const params = {
		Bucket: s3BucketName,
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
