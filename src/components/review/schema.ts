import mongoose, { Schema, Document } from "mongoose"
import { composeWithMongoose } from "graphql-compose-mongoose"
import { schemaComposer } from "graphql-compose"
import { IUser } from "../user/schema"
import { IProduct } from "../product/schema"

export interface IReview extends Document {
	reviewer: IUser["_id"]
	product: IProduct["_id"]
	rating: number
	review: string
	editCount: number
	createdAt: Date
	updatedAt: Date
}

const reviewSchema = new Schema(
	{
		reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
		product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
		rating: { type: Number, required: true },
		review: { type: String, required: true },
		editCount: { type: Number, default: 0 },
	},
	{ timestamps: true }
)

export const ReviewModel = mongoose.model<IReview>("Review", reviewSchema)
const ReviewTC = composeWithMongoose(ReviewModel)

schemaComposer.Query.addFields({
	reviewById: ReviewTC.getResolver("findById"),
	reviewByIds: ReviewTC.getResolver("findByIds"),
	reviewOne: ReviewTC.getResolver("findOne"),
	reviewMany: ReviewTC.getResolver("findMany"),
	reviewCount: ReviewTC.getResolver("count"),
	reviewConnection: ReviewTC.getResolver("connection"),
	reviewPagination: ReviewTC.getResolver("pagination"),
})

schemaComposer.Mutation.addFields({
	reviewCreateOne: ReviewTC.getResolver("createOne"),
	reviewCreateMany: ReviewTC.getResolver("createMany"),
	reviewUpdateById: ReviewTC.getResolver("updateById"),
	reviewUpdateOne: ReviewTC.getResolver("updateOne"),
	reviewUpdateMany: ReviewTC.getResolver("updateMany"),
	reviewRemoveById: ReviewTC.getResolver("removeById"),
	reviewRemoveOne: ReviewTC.getResolver("removeOne"),
	reviewRemoveMany: ReviewTC.getResolver("removeMany"),
})

const reviewSchemaGQL = schemaComposer.buildSchema()

export default reviewSchemaGQL
