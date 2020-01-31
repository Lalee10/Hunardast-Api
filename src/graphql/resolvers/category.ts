import { ApolloError } from "apollo-server-express"
import { ObjectType, Field, ID, Query, Mutation, Arg, Ctx, Resolver } from "type-graphql"
import CoreDatabase from "../../models/interface"

@ObjectType()
class Category {
	@Field(type => ID)
	_id: string

	@Field()
	name: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

@Resolver(Category)
class CategoryResolver {
	@Query(returns => Category, { nullable: true })
	async category(
		@Ctx("db") db: CoreDatabase,
		@Arg("id", { nullable: true }) id?: string,
		@Arg("name", { nullable: true }) name?: string
	): Promise<Category | null> {
		return await db.Category.findOne({ $or: [{ _id: id }, { name: name }] })
	}

	@Query(returns => [Category])
	async categories(@Ctx("db") db: CoreDatabase): Promise<Category[]> {
		return await db.Category.find()
	}

	@Mutation(returns => Category)
	async addCategory(@Arg("name") name: string, @Ctx("db") db: CoreDatabase): Promise<Category> {
		return await db.Category.create({ name })
	}

	@Mutation(returns => Category)
	async updateCategory(
		@Arg("id") id: string,
		@Arg("newName") newName: string,
		@Ctx("db") db: CoreDatabase
	): Promise<Category | null> {
		const category = await db.Category.findById(id)
		const oldName = category?.name

		if (!category) {
			throw new ApolloError("No category with this key found")
		} else if (oldName === newName) {
			return category
		} else {
			await category.updateOne({ name: newName })
			return await db.Category.findById(id)
		}
	}

	@Mutation(returns => String)
	async deleteCategory(@Arg("id") id: string, @Ctx("db") db: CoreDatabase): Promise<string> {
		// TODO: check if a product belongs to this category before deletion
		await db.Category.deleteOne({ _id: id })
		return id
	}
}

export default CategoryResolver
