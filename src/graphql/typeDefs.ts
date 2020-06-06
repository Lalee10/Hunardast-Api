import gql from "graphql-tag"

const typeDefs = gql`
	scalar Date
	scalar JSON
	scalar JSONObject

	type User {
		_id: ID!
		name: String!
		email: String!
		permissions: [String!]!
		createdAt: Date!
		updatedAt: Date!
	}

	type Store {
		_id: ID!
		name: String!
		slug: String!
		logo: String
		banner: String
		location: String!
		tagline: String!
		manager: String!
		createdAt: Date!
		updatedAt: Date!
	}

	type Review {
		_id: ID!
		reviewer: String!
		product: String!
		rating: Int!
		review: String!
		editCount: Int!
		createdAt: Date!
		updatedAt: Date!
	}

	type Product {
		_id: ID!
		name: String!
		images: [String!]!
		price: Float!
		discount: Float!
		category: String!
		description: String!
		sizes: [String!]!
		colors: [String!]!
		store: String!
		renewalType: String
		expiresAt: Date
		createdAt: Date!
		updatedAt: Date!
	}

	input StoreCreateInput {
		name: String!
		location: String!
		tagline: String!
	}

	input StoreUpdateInput {
		name: String
		logo: String
		banner: String
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

		# Product
		createProduct(data: JSONObject!): Product!
		updateProduct(data: JSONObject!): Product!
	}

	type Query {
		verifyUser(required: Boolean!): User
		readMyStore: Store

		# Product
		getProductById(id: String!): Product
		getMyProducts: [Product]!
	}
`

export default typeDefs
