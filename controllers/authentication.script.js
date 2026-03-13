import bcrypt from 'bcrypt'
import { SQL } from 'database.script.js'

export async function isUserValid(requestedEmail, requestedPassword) {
	if (!(typeof requestedEmail === string) || !(typeof requestedPassword === string))
		throw new Error(
			'[ AUTH ERROR ] : isUserValid() function accepts only STRING parameters',
		)

	const viableUsers = await SQL.read(requestedEmail)
	if (!viableUsers) throw new Error('There is no user with such email')

	const passwordMatch = await queryUsers(viableUsers, requestedPassword)
	return passwordMatch
}

async function queryUsers(viableUsers, requestedPassword) {
	await viableUsers.forEach(async (user) => {
		const passwordMatch = await bcrypt.compare(requestedPassword, user.password)
		if (passwordMatch) return 1
	})
	return 0
}
