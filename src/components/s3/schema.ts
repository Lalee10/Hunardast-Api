import { schemaComposer } from "graphql-compose"
import { signedUrlResolver } from "./resolvers"

const S3Payload = schemaComposer.createObjectTC({
	name: "S3Payload",
	fields: {
		signedRequest: "String!",
		url: "String!",
	},
})

schemaComposer.Query.addFields({
	getSignedUrl: {
		type: S3Payload,
		args: { fileName: "String!", fileType: "String!" },
		resolve: signedUrlResolver,
	},
})

const s3SchemaGQL = schemaComposer.buildSchema()
export default s3SchemaGQL
