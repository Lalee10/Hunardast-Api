import { mergeSchemas } from "apollo-server-express"
import categorySchemaGQL from "../components/category/schema"
import userSchemaGQL from "../components/user/schema"
import storeSchemaGQL from "../components/store/schema"
import productSchemaGQL from "../components/product/schema"
import reviewSchemaGQL from "../components/review/schema"
import s3SchemaGQL from "../components/s3/schema"

const composedSchema = mergeSchemas({
	schemas: [
		userSchemaGQL,
		categorySchemaGQL,
		storeSchemaGQL,
		reviewSchemaGQL,
		productSchemaGQL,
		s3SchemaGQL,
	],
})

export default composedSchema
