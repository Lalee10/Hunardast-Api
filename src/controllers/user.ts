import { Model } from "mongoose"
import { IUser } from "../models/user"

/**
 *
 * @param {Model<IUser} Model mongoose model for Users
 * @param {IUser} newUser data for the new user
 * @returns {Promise<IUser>} a promise that resolves a user
 */
const createUser = async (Model: Model<IUser>, newUser: IUser): Promise<IUser> => {
	// Find a user with a similar authz Id
	let user = await Model.findOne({ authzId: newUser.authzId })

	// If user doesn't exist then create a new one with the data provided
	if (!user) user = await Model.create(newUser)

	return user
}

/**
 *
 * @param {Model<IUser} Model  mongoose model for the user
 * @param {IUser} userSearchParams search params for the user
 * @returns {Promise<IUser | null>} a promise that resolves a user
 */
const findUser = async (Model: Model<IUser>, userSearchParams: IUser): Promise<IUser | null> => {
	return await Model.findOne(userSearchParams)
}

export default {
	createUser,
	findUser
}
