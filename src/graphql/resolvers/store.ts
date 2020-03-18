import { ApolloError } from "apollo-server-express"
import { UnauthorizedError } from "../../helpers/error"
import { getSlug } from "../../helpers/string"
import { IMutationResolvers, IQueryResolvers } from "../../typings/types"

export const storeQueries: IQueryResolvers = {
	readMyStore: async (root, args, ctx) => {
		const { db, user } = ctx
		if (!user) throw new UnauthorizedError(401, "User must be logged in to view their store")
		return await db.Store.findOne({ manager: user._id })
	}
}

export const storeMutations: IMutationResolvers = {
	createStore: async (root, args, ctx) => {
		const { data } = args
		const { db, user } = ctx
		if (!user) throw new UnauthorizedError(401, "User must be logged in to create a store")

		// Validate that user doesn't have a store
		const userHasStore = await db.Store.exists({ manager: user._id })
		if (userHasStore) throw new ApolloError("User already has a store linked to their account")

		const slug = getSlug(data.name)

		// Validate name
		const nameExists = await db.Store.exists({ name: data.name, slug: slug })
		if (nameExists) throw new ApolloError("A store with this name already exists")

		const store = await db.Store.create({ ...data, slug, manager: user._id })

		return store
	}
}
