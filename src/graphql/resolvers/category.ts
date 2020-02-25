import { ApolloError } from "apollo-server-express"
import { ObjectType, Field, ID, Query, Mutation, Arg, Ctx, Resolver } from "type-graphql"
import { CoreDatabase } from "../../models/interface"
import { getSlug } from "../../helpers/string"

@ObjectType()
class Category {
	@Field(type => ID)
	_id: string

	@Field()
	name: string

	@Field()
	slug: string

	@Field()
	parent: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

@Resolver(Category)
class CategoryResolver {
	@Query(returns => Category, { nullable: true })
	async readCategory(
		@Ctx("db") db: CoreDatabase,
		@Arg("_id", { nullable: true }) _id?: string,
		@Arg("name", { nullable: true }) name?: string,
		@Arg("parent", { nullable: true }) parent?: string
	): Promise<Category | null> {
		return await db.Category.findOne({ $or: [{ _id }, { name }, { parent }] })
	}

	@Query(returns => [Category])
	async readCategories(@Ctx("db") db: CoreDatabase): Promise<Category[]> {
		return await db.Category.find()
	}

	@Mutation(returns => Category)
	async addCategory(@Arg("name") name: string, @Ctx("db") db: CoreDatabase): Promise<Category> {
		return await db.Category.create({ name, slug: getSlug(name) })
	}

	@Mutation(returns => Category)
	async updateCategory(
		@Arg("_id") _id: string,
		@Arg("newName") newName: string,
		@Ctx("db") db: CoreDatabase
	): Promise<Category | null> {
		const category = await db.Category.findById(_id)
		const oldName = category?.name

		if (!category) {
			throw new ApolloError("No category with this key found")
		} else if (oldName === newName) {
			return category
		} else {
			await category.updateOne({ name: newName, slug: getSlug(newName) })
			return await db.Category.findById(_id)
		}
	}

	@Mutation(returns => Boolean)
	async deleteCategory(@Arg("_id") _id: string, @Ctx("db") db: CoreDatabase): Promise<boolean> {
		// TODO: check if a product belongs to this category before deletion
		const { deletedCount } = await db.Category.deleteOne({ _id })
		return deletedCount ? true : false
	}
}

export default CategoryResolver
