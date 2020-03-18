import { ObjectType, Field, ID, Resolver, Query, Arg, Ctx, Mutation, InputType } from "type-graphql"
import { ApolloError } from "apollo-server-express"
import { ApolloContext } from "../../models/interface"
import { UnauthorizedError } from "../../helpers/error"
import { getSlug } from "../../helpers/string"
import { IStore } from "../../models/store"

@ObjectType()
export class Store implements Partial<IStore> {
	@Field(type => ID)
	_id: string

	@Field()
	name: string

	@Field()
	slug: string

	@Field(type => [String], { nullable: "items" })
	banner?: string[]

	@Field({ nullable: true })
	image?: string

	@Field()
	location: string

	@Field()
	tagline: string

	@Field()
	manager: string

	@Field(type => Date)
	createdAt: Date

	@Field(type => Date)
	updatedAt: Date
}

@InputType()
export class CreateMyStoreInput {
	@Field()
	name: string

	@Field({ nullable: true })
	banner?: string

	@Field({ nullable: true })
	image?: string

	@Field()
	location: string

	@Field()
	tagline: string
}

@InputType()
export class EditMyStoreInput {
	@Field({ nullable: true })
	name?: string

	@Field({ nullable: true })
	banner?: string

	@Field({ nullable: true })
	image?: string

	@Field({ nullable: true })
	location?: string

	@Field({ nullable: true })
	tagline?: string
}

@Resolver(Store)
class MyStoreResolver {
	@Query(returns => [Store], { nullable: "items" })
	async readStores(@Ctx() ctx: ApolloContext) {
		if (!ctx.user) throw new UnauthorizedError(401, "User must be logged in to view their store")
		return await ctx.db.Store.find()
	}

	@Query(returns => Store, { nullable: true })
	async readMyStore(@Ctx() ctx: ApolloContext) {
		if (!ctx.user) throw new UnauthorizedError(401, "User must be logged in to view their store")
		return await ctx.db.Store.findOne({ manager: ctx.user })
	}

	@Mutation(returns => Store)
	async createMyStore(@Arg("data") storeData: CreateMyStoreInput, @Ctx() ctx: ApolloContext) {
		const { db, user } = ctx
		if (!user) throw new UnauthorizedError(401, "User must be logged in to create a store")

		// Validate that user doesn't have a store
		const userHasStore = await db.Store.exists({ manager: user._id })
		if (userHasStore) throw new ApolloError("User already has a store linked to their account")

		const slug = getSlug(storeData.name)

		// Validate name
		const nameExists = await db.Store.exists({ name: storeData.name, slug: slug })
		if (nameExists) throw new ApolloError("A store with this name already exists")

		const store = await db.Store.create({ ...storeData, slug, manager: user._id })

		return store
	}

	@Mutation(returns => Store)
	async updateMyStore(@Arg("data") storeData: EditMyStoreInput, @Ctx() ctx: ApolloContext) {
		const { db, user } = ctx
		if (!user) throw new UnauthorizedError(401, "User must be logged in to update a store")

		const store = await db.Store.findOne({ manager: user._id })
		if (!store) throw new ApolloError("User does not have a store linked to their account")
		await store.updateOne(storeData)
		return await db.Store.findById(store._id)
	}
}

export default MyStoreResolver
