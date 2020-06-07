import { IQueryResolvers } from "../../typings/types"
import { authQueries } from "./auth"
import { storeQueries } from "./store"
import { productQueries } from "./product"

const QueryResolver: IQueryResolvers = {
	...authQueries,
	...storeQueries,
	...productQueries,
}

export default QueryResolver
