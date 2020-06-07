export function logInfo(info: string) {
	console.log(`[${new Date().toString()}][Info] ${info}`)
}

export function logError(error: string) {
	console.error(`[${new Date().toString()}][Error] ${error}`)
}
