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
		store: Store
		createdAt: Date!
		updatedAt: Date!
		cart: JSON
		profile: JSON
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
		store: Store!
		renewalType: String!
		expiresAt: Date!
		inStock: Int!
		createdAt: Date!
		updatedAt: Date!
	}

	type Order {
		_id: ID!
		orderNo: Int!
		amount: Float!
		quantity: Int!
		color: String!
		size: String!
		personalization: String!
		details: JSON
		status: String!
		verified: Boolean!
		product: Product!
		store: Store!
		placedBy: User!
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

	type AuthResponse {
		user: User!
		token: String!
		cart: JSON!
		profile: JSON!
	}

	type Mutation {
		# AWS S3
		getSignedUrl(fileName: String!, fileType: String!): S3Payload!

		# User
		registerUser(
			password: String!
			email: String!
			name: String!
		): AuthResponse!
		loginUser(password: String!, email: String!): AuthResponse!
		logoutUser: String!

		# Store
		createStore(data: StoreCreateInput!): Store!
		updateStore(data: StoreUpdateInput!): Store

		# Product
		createProduct(data: JSONObject!): Product!
		updateProduct(id: ID!, data: JSONObject!): Product!

		# Order
		createOrder(data: JSONObject!): Order!
		updateOrder(id: ID!, data: JSONObject!): Order!

		# Cart
		updateCart(data: [JSONObject!]!): [JSONObject!]!
	}

	type Query {
		validateCart(data: [JSONObject!]!): [Product!]!
		verifyUser(required: Boolean): User
		readMyStore: Store

		# Product
		getProductById(id: String!): Product
		getMyProducts(query: JSON): [Product!]!
		getProducts(
			query: JSON
			limit: Int = 100
			offset: Int = 0
			sort: JSON
		): [Product!]!

		# Order
		getOrders(query: JSON): [Order!]!
	}
`

export default typeDefs
