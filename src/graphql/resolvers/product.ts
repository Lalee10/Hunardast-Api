import { ApolloError } from "apollo-server-micro"
import { IMutationResolvers, IQueryResolvers } from "../../typings/types"
import { ApolloContext } from "../../models/interface"

async function getUserStore(ctx: ApolloContext) {
	const store = await ctx.db.Store.findOne({ manager: ctx.user._id })
	if (!store) throw new ApolloError("User does not have a store", "NO_STORE")
	else return store
}

export const productQueries: IQueryResolvers = {
	getMyProducts: async function (root, args, ctx) {
		const store = await getUserStore(ctx)
		return await ctx.db.Product.find({ store: store._id })
	},
	getProductById: async function (root, args, ctx) {
		return await ctx.db.Product.findById(args.id)
	},
}

export const productMutations: IMutationResolvers = {
	createProduct: async function (root, args, ctx) {
		const store = await getUserStore(ctx)

		const newProduct = args.data
		return await ctx.db.Product.create({ ...newProduct, store: store._id })
	},
	updateProduct: async function (root, args, ctx) {
		await getUserStore(ctx)

		const updatedProduct = args.data
		return await ctx.db.Product.findByIdAndUpdate(updatedProduct._id, updatedProduct, {
			new: true,
		})
	},
}
