import { gql } from "apollo-server-express"

const typeDefs = gql`
	scalar Date

	type DecodedUser {
		_id: String!
		name: String!
		email: String!
	}

	type User @entity(additionalFields: [{ path: "password", type: "string" }]) {
		_id: ID! @id
		email: String! @column
		name: String! @column
		permissions: [String]! @column
		createdAt: Date! @column
		updatedAt: Date! @column
	}

	type Store @entity {
		_id: ID! @id
		name: String! @column
		slug: String! @column
		banner: String @column
		image: String @column
		location: String! @column
		tagline: String! @column
		manager: String! @column
		createdAt: Date! @column
		updatedAt: Date! @column
	}

	type Category @entity {
		_id: ID! @id
		name: String! @column
		slug: String! @column
		parent: String! @column
		createdAt: Date! @column
		updatedAt: Date! @column
	}

	input StoreCreateInput {
		name: String!
		location: String!
		tagline: String!
	}

	input StoreUpdateInput {
		name: String
		banner: String
		image: String
		location: String
		tagline: String
	}

	type S3Payload {
		signedRequest: String!
		url: String!
	}

	type Mutation {
		# AWS S3
		getSignedUrl(fileName: String!, fileType: String!): S3Payload!

		# User
		loginUser(password: String!, email: String!): User!
		logoutUser: String!
		registerUser(password: String!, email: String!, name: String!): User!

		# Store
		createStore(data: StoreCreateInput!): Store!
		updateStore(data: StoreUpdateInput!): Store
	}

	type Query {
		verifyUser(required: Boolean!): DecodedUser
		readMyStore: Store
	}
`

export default typeDefs
