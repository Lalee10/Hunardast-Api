import { ObjectType, Field, ID, Resolver, Query, Arg, Ctx, Mutation, InputType } from "type-graphql"
import { CoreDatabase, ApolloContext } from "../../models/interface"
import { UnauthorizedError } from "../../helpers/error"
import { getSlug } from "../../helpers/string"
import { ApolloError } from "apollo-server-express"

@ObjectType()
export class Store {
	@Field(type => ID)
	_id: string

	@Field()
	name: string

	@Field()
	slug: string

	@Field()
	location: string

	@Field()
	description: string

	@Field()
	manager: string

	@Field(type => [String], { nullable: "items" })
	reviews: string[]

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

@InputType()
export class AddMyStoreInput {
	@Field()
	name: string

	@Field()
	location: string

	@Field()
	description: string
}

@InputType()
export class EditMyStoreInput {
	@Field({ nullable: true })
	name?: string

	@Field({ nullable: true })
	location?: string

	@Field({ nullable: true })
	description?: string
}

@Resolver(Store)
class MyStoreResolver {
	@Query(returns => Store, { nullable: true })
	async readMyStore(@Ctx() ctx: ApolloContext) {
		if (!ctx.userId) throw new UnauthorizedError(401, "User must be logged in to view their store")
		return await ctx.db.Store.findOne({ manager: ctx.userId })
	}

	@Mutation(returns => Store)
	async createMyStore(
		@Arg("data") storeData: AddMyStoreInput,
		@Ctx("userId") userId: string,
		@Ctx("db") db: CoreDatabase
	) {
		if (!userId) throw new UnauthorizedError(401, "User must be logged in to create a store")

		const userHasStore = await db.Store.exists({ manager: userId })
		if (userHasStore) throw new ApolloError("User already has a store linked to their account")

		const slug = getSlug(storeData.name)
		const manager = userId
		const store = await db.Store.create({ ...storeData, slug, manager })

		return store
	}

	@Mutation(returns => String)
	async updateMyStore(
		@Arg("data") storeData: EditMyStoreInput,
		@Ctx("userId") userId: string,
		@Ctx("db") db: CoreDatabase
	) {
		if (!userId) throw new UnauthorizedError(401, "User must be logged in to update a store")

		const store = await db.Store.findOne({ manager: userId })
		if (!store) throw new ApolloError("User does not have a store linked to their account")
		await store.updateOne(storeData)
		return store._id
	}
}

export default MyStoreResolver
