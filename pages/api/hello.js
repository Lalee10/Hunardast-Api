module.exports = (req, res) => {
	const rand = Math.random()

	res.send(`Hello world from /api/hello ${rand}`)
}
