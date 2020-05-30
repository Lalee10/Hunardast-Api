import mongoose, { Schema, Document } from "mongoose"
import { composeWithMongoose } from "graphql-compose-mongoose"
import { schemaComposer } from "graphql-compose"
import { loginResolver, registerResolver } from "./resolvers"
import { logoutResolver, verifyUser } from "./resolvers"

export interface IUser extends Document {
	name: string
	email: string
	password: string
	permissions: string[]
	createdAt: Date
	updatedAt: Date
}

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: { type: String, required: true },
		permissions: { type: [String], lowercase: true, trim: true, default: [] },
	},
	{ timestamps: true }
)

export const UserModel = mongoose.model<IUser>("User", userSchema)

const UserTC = composeWithMongoose(UserModel)

UserTC.removeField("password")

UserTC.addResolver({
	name: "registerUser",
	type: "User!",
	args: { name: "String!", email: "String!", password: "String!" },
	resolve: registerResolver,
})

UserTC.addResolver({
	name: "loginUser",
	type: "User!",
	args: { email: "String!", password: "String!" },
	resolve: loginResolver,
})

UserTC.addResolver({
	name: "logoutUser",
	type: "Boolean!",
	resolve: logoutResolver,
})

UserTC.addResolver({
	name: "verifyUser",
	args: { required: "Boolean!" },
	type: UserTC,
	resolve: verifyUser,
})

schemaComposer.Query.addFields({
	verifyUser: UserTC.getResolver("verifyUser"),
	// userById: UserTC.getResolver("findById"),
	// userByIds: UserTC.getResolver("findByIds"),
	// userOne: UserTC.getResolver("findOne"),
	// userMany: UserTC.getResolver("findMany"),
	// userCount: UserTC.getResolver("count"),
	// userConnection: UserTC.getResolver("connection"),
	// userPagination: UserTC.getResolver("pagination"),
})

schemaComposer.Mutation.addFields({
	registerUser: UserTC.getResolver("registerUser"),
	loginUser: UserTC.getResolver("loginUser"),
	logoutUser: UserTC.getResolver("logoutUser"),
	// userCreateOne: UserTC.getResolver("createOne"),
	// userCreateMany: UserTC.getResolver("createMany"),
	// userUpdateById: UserTC.getResolver("updateById"),
	// userUpdateOne: UserTC.getResolver("updateOne"),
	// userUpdateMany: UserTC.getResolver("updateMany"),
	// userRemoveById: UserTC.getResolver("removeById"),
	// userRemoveOne: UserTC.getResolver("removeOne"),
	// userRemoveMany: UserTC.getResolver("removeMany"),
})

const userSchemaGQL = schemaComposer.buildSchema()

export default userSchemaGQL
