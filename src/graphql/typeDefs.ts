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
		banner: [String]! @column
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

	input CreateStoreInput {
		name: String!
		banner: String
		image: String
		location: String!
		tagline: String!
	}

	input UpdateStoreInput {
		name: String
		banner: String
		image: String
		location: String
		tagline: String
	}

	type Mutation {
		registerUser(password: String!, email: String!, name: String!): User!
		loginUser(password: String!, email: String!): User!
		logoutUser: String!
		createStore(data: CreateStoreInput!): Store!
		updateStore(data: UpdateStoreInput!): Store!
	}

	type Query {
		verifyUser(required: Boolean!): DecodedUser
		readMyStore: Store
	}
`

export default typeDefs
