import { ApolloError } from "apollo-server-micro"
import { IMutationResolvers, IQueryResolvers } from "../../typings/types"

export const orderQueries: IQueryResolvers = {
	getOrders: async function (root, args, ctx) {
		return await ctx.db.Order.find(args.query)
			.populate("product")
			.populate("store")
			.populate("placedBy")
			.lean()
	},
}

export const orderMutations: IMutationResolvers = {
	createOrder: async function (root, args, ctx) {
		const maxId = await ctx.db.Order.findOne().sort({ orderNo: -1 })
		const product = await ctx.db.Product.findById(args.data.productId)
		if (!product) throw new ApolloError("No product found", "NOT_FOUND")

		if (product.inStock < args.data.quantity) {
			throw new ApolloError("Not enough products in stock", "OUT_OF_STOCK")
		}

		const created = await ctx.db.Order.create({
			orderNo: maxId || 1000,
			...args.data,
			product: product._id,
			store: product.store,
			placedBy: ctx.user._id,
		})

		return await ctx.db.Order.findById(created._id)
			.populate("product")
			.populate("store")
			.populate("placedBy")
			.lean()
	},
	updateOrder: async function (root, args, ctx) {
		const order = await ctx.db.Order.findById(args.id)
		if (!order) throw new ApolloError("Order not found", "NOT_FOUND")

		return await ctx.db.Order.findByIdAndUpdate(args.id, args.data, {
			new: true,
		})
			.populate("product")
			.populate("store")
			.populate("placedBy")
			.lean()
	},
}
