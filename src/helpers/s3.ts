import AWS from "aws-sdk"

const accessKeyId = process.env.HD_S3_ACCESS_ID
const secretAccessKey = process.env.HD_S3_ACCESS_KEY

const s3 = new AWS.S3({
	region: "ap-south-1",
	signatureVersion: "v4",
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
})

export default s3
