import { IMutationResolvers } from "../../typings/types"
import { authMutations } from "./auth"
import { storeMutations } from "./store"
import { getSignedUrl } from "../../components/s3"
import { productMutations } from "./product"
import { orderMutations } from "./order"

const MutationResolver: IMutationResolvers = {
	getSignedUrl: async (root, args, ctx) =>
		getSignedUrl(args.fileName, args.fileType),
	...authMutations,
	...storeMutations,
	...productMutations,
	...orderMutations,
}

export default MutationResolver
