import { IMutationResolvers } from "../../typings/types"
import { authMutations } from "./auth"
import { storeMutations } from "./store"
import { commonMutations } from "./common"

const MutationResolver: IMutationResolvers = {
	...authMutations,
	...storeMutations,
	...commonMutations,
}

export default MutationResolver
