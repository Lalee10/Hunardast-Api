import mongoose, { Schema } from "mongoose"
import { composeWithMongoose } from "graphql-compose-mongoose"
import { schemaComposer } from "graphql-compose"

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: 50,
			minlength: 5,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
	},
	{ timestamps: true }
)

const Category = mongoose.model("Category", categorySchema)
const CategoryTC = composeWithMongoose(Category)

schemaComposer.Query.addFields({
	categoryById: CategoryTC.getResolver("findById"),
	categoryByIds: CategoryTC.getResolver("findByIds"),
	categoryOne: CategoryTC.getResolver("findOne"),
	categoryMany: CategoryTC.getResolver("findMany"),
	categoryCount: CategoryTC.getResolver("count"),
	categoryConnection: CategoryTC.getResolver("connection"),
	categoryPagination: CategoryTC.getResolver("pagination"),
})

schemaComposer.Mutation.addFields({
	categoryCreateOne: CategoryTC.getResolver("createOne"),
	categoryCreateMany: CategoryTC.getResolver("createMany"),
	categoryUpdateById: CategoryTC.getResolver("updateById"),
	categoryUpdateOne: CategoryTC.getResolver("updateOne"),
	categoryUpdateMany: CategoryTC.getResolver("updateMany"),
	categoryRemoveById: CategoryTC.getResolver("removeById"),
	categoryRemoveOne: CategoryTC.getResolver("removeOne"),
	categoryRemoveMany: CategoryTC.getResolver("removeMany"),
})

const categorySchemaGQL = schemaComposer.buildSchema()

export default categorySchemaGQL
