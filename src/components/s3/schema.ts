import { schemaComposer } from "graphql-compose"
import { signedUrlResolver } from "./resolvers"

schemaComposer.createObjectTC({
	name: "S3Payload",
	fields: {
		signedRequest: "String!",
		url: "String!",
	},
})

schemaComposer.Mutation.addFields({
	getSignedUrl: {
		type: `S3Payload!`,
		args: { fileName: "String!", fileType: "String!" },
		resolve: signedUrlResolver,
	},
})

const s3SchemaGQL = schemaComposer.buildSchema()
export default s3SchemaGQL
