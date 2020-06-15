import { IQueryResolvers } from "../../typings/types"
import { authQueries } from "./auth"
import { storeQueries } from "./store"
import { productQueries } from "./product"
import { orderQueries } from "./order"

const QueryResolver: IQueryResolvers = {
	...authQueries,
	...storeQueries,
	...productQueries,
	...orderQueries,
}

export default QueryResolver
