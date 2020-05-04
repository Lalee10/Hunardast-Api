import { ApolloError } from "apollo-server-express"
import { UnauthorizedError } from "../../helpers/error"
import { getSlug } from "../../helpers/string"
import { IMutationResolvers, IQueryResolvers } from "../../typings/types"

export const storeQueries: IQueryResolvers = {
	readMyStore: async (root, args, ctx) => {
		const { db, user } = ctx
		if (!user) throw new UnauthorizedError(401, "User must be logged in to view their store")
		const store = await db.Store.findOne({ manager: user._id })
		return store
	},
}

export const storeMutations: IMutationResolvers = {
	createStore: async (root, { data }, ctx) => {
		const { name } = data
		const { db, user } = ctx

		if (!user) throw new UnauthorizedError(401, "User must be logged in to create a store")

		const slug = getSlug(name)
		const nameExists = await db.Store.exists({ name, slug })
		if (nameExists) throw new ApolloError("A store with this name already exists")

		const created = await db.Store.create({
			slug: slug,
			manager: user._id,
			...data,
		})

		return created
	},
	updateStore: async (root, { data }, { db, user }) => {
		if (!user) throw new UnauthorizedError(401, "User must be logged in to update their store")

		const store = await db.Store.findOne({ manager: user._id })
		if (!store) throw new ApolloError("User has no store linked to their account")

		const slug = data.name ? getSlug(data.name) : store.slug
		await store.updateOne({ ...data, slug })

		return await db.Store.findById(store._id)
	},
}
