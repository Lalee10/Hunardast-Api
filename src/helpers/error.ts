export class UnauthorizedError extends Error {
	statusCode: number

	constructor(statusCode = 401, message = "Invalid Token. Authentication Failed!") {
		super(message)
		this.statusCode = statusCode
	}
}
