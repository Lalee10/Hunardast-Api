import { IMutationResolvers } from "../../typings/types"
import { authMutations } from "./auth"
import { storeMutations } from "./store"

const MutationResolver: IMutationResolvers = {
	...authMutations,
	...storeMutations
}

export default MutationResolver
