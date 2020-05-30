import { IQueryResolvers } from "../../typings/types"
import { authQueries } from "./auth"
import { storeQueries } from "./store"

const QueryResolver: IQueryResolvers = {
	...authQueries,
	...storeQueries,
}

export default QueryResolver
