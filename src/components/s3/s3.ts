import AWS from "aws-sdk"

const s3 = new AWS.S3({
	region: "ap-south-1",
	signatureVersion: "v4",
})

export default s3