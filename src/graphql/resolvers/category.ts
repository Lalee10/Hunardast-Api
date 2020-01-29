import { ApolloError } from "apollo-server"
import { ObjectType, Field, ID, Query, Mutation, Arg } from "type-graphql"
import db from "../../models"

@ObjectType()
class CategoryType {
	@Field(type => ID)
	_id: string

	@Field()
	name: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

class CategoryResolver {
	@Query(returns => [CategoryType]!)
	async categories() {
		try {
			return await db.Category.find()
		} catch (error) {
			throw error
		}
	}

	@Mutation(returns => CategoryType)
	async addCategory(@Arg("name") name: string): Promise<CategoryType> {
		try {
			return await db.Category.create({ name })
		} catch (error) {
			throw error
		}
	}

	@Mutation(returns => CategoryType || null)
	async updateCategory(@Arg("id") id: string, @Arg("newName") newName: string): Promise<CategoryType | null> {
		try {
			const category = await db.Category.findById(id)

			if (!category) {
				throw new ApolloError("No category with this key found")
			} else if (category.name === newName) {
				return category
			} else {
				await category.updateOne({ name: newName })
				return await db.Category.findById(id)
			}
		} catch (error) {
			throw error
		}
	}

	@Mutation(returns => String)
	async deleteCategory(@Arg("id") id: string): Promise<string> {
		try {
			// TODO: check if a product belongs to this category before deletion
			await db.Category.deleteOne({ _id: id })
			return id
		} catch (error) {
			throw error
		}
	}
}

export default CategoryResolver
