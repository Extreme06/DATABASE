import bcrypt from 'bcrypt'
import { SQL } from 'database.script.js'

export async function isUserValid(requestedPassword, requestedEmail) {
	if (!(typeof requestedEmail === string) || !(typeof requestedPassword === string))
		throw new Error(
			'[ AUTH ERROR ] : isUserValid() function accepts only STRING parameters',
		)

	const emailMatch = queryEmail()
	if (!emailMatch) throw new Error('There is no user with such email')

	const user = await SQL.readByEmail(requestedEmail)

	const passwordMatch = bcrypt.compare(requestedPassword, user.password)

	const response = passwordMatch && emailMatch
	return response
}

async function queryEmail(requestedEmail) {
	const possibleEmails = await SQL.fetchEmail()

	possibleEmails.forEach((email) => {
		if (requestedEmail === email) return 1
	})

	return 0
}
