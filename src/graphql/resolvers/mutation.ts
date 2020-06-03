import { IMutationResolvers } from "../../typings/types"
import { authMutations } from "./auth"
import { storeMutations } from "./store"
import { getSignedUrl } from "../../components/s3"

const MutationResolver: IMutationResolvers = {
	...authMutations,
	...storeMutations,
	getSignedUrl: async (root, args, ctx) => getSignedUrl(args.fileName, args.fileType),
}

export default MutationResolver
