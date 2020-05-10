import { schemaComposer } from "graphql-compose"
import { signedUrlResolver } from "./resolvers"

const S3Payload = schemaComposer.createObjectTC({
	name: "S3Payload",
	fields: {
		signedRequest: "String!",
		url: "String!",
	},
})

const getSignedUrlResolver = schemaComposer.createResolver({
	name: "getSignedUrl",
	type: S3Payload.getTypeNonNull(),
	args: { fileName: "String!", fileType: "String!" },
	resolve: signedUrlResolver,
})

schemaComposer.Mutation.addFields({
	getSignedUrl: getSignedUrlResolver,
})

const s3SchemaGQL = schemaComposer.buildSchema()
export default s3SchemaGQL
