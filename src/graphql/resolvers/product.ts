import { ApolloError } from "apollo-server-micro"
import {
	IMutationResolvers,
	IQueryResolvers,
	IProduct,
} from "../../typings/types"
import { ApolloContext } from "../../models/interface"
import { s3DeleteObjects } from "../../components/s3"

async function getUserStore(ctx: ApolloContext) {
	if (!ctx.user) throw new ApolloError("User does not exist", "NOT_FOUND")

	const store = await ctx.db.Store.findOne({ manager: ctx.user._id })
	if (!store) throw new ApolloError("User does not have a store", "NOT_FOUND")
	else return store
}

export const productQueries: IQueryResolvers = {
	getProducts: async function (root, args, ctx) {
		const sort = args.sort || { createdAt: -1 }
		return await ctx.db.Product.find({
			...args.query,
			"images.0": { $exists: true },
		})
			.sort(sort)
			.skip(args.offset)
			.limit(args.limit)
			.populate("store")
			.lean()
	},
	getMyProducts: async function (root, args, ctx) {
		const store = await getUserStore(ctx)
		return await ctx.db.Product.find({ store: store._id })
			.populate("store")
			.lean()
	},
	getProductById: async function (root, args, ctx) {
		return await ctx.db.Product.findById(args.id).populate("store").lean()
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
		const product = await ctx.db.Product.findById(args.id)

		if (!product) throw new ApolloError("No product found", "NOT_FOUND")

		if (args.data.images) {
			const oldImages = product.images
			const newImages = args.data.images
			const imagesToDelete = oldImages.filter((e) => !newImages.includes(e))
			if (imagesToDelete.length > 0) s3DeleteObjects(imagesToDelete)
		}

		const updated = await ctx.db.Product.findByIdAndUpdate(
			product._id,
			updatedProduct,
			{ new: true }
		)
		return updated as IProduct
	},
}
