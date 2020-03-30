import { IQueryResolvers } from "../../typings/types"
import { authQueries } from "./auth"
import { storeQueries } from "./store"
import { commonQueries } from "./common"

const QueryResolver: IQueryResolvers = {
	...authQueries,
	...storeQueries,
	...commonQueries,
}

export default QueryResolver
