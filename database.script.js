import mysql from 'mysql2'

const pool = mysql
	.createPool({
		host: process.env.SQL_HOST,
		user: process.env.SQL_USER,
		password: process.env.SQL_PASSWORD,
		database: process.env.SQL_DATABASE,
	})
	.promise()

export const SQL = {
	read: async (id = 0) => {
		if (isNaN(id)) throw new Error('Invalid parameter, SQL.read() accepts only numbers!')

		const [rows] = !id
			? await pool.query('SELECT * FROM users')
			: await pool.query('SELECT * FROM users WHERE id=?', [id])

		// const userData = JSON.stringify(rows, null, 2)

		if (rows.length === 0) throw new Error(`User with ID [${id}] not found`)

		return rows[0]
	},

	insert: async (userName, email = '/') => {
		if (!userName) throw new Error('[DATABASE ERROR]: Invalid values for names')

		try {
			const [result] = await pool.query(
				'INSERT INTO users (userName, email) VALUES (?, ?, ?)',
				[userName.toString(), email.toString()],
			)
			console.log(
				`User [${userName}] successfully inserted into Database with ID: [${result.insertId}]`,
			)
			return result.insertId
		} catch (error) {
			console.error('[DATABASE ERROR]: ', error.message)
			return null
		}
	},

	delete: async (deleteParamater = 0) => {
		if (!deleteParamater) throw new Error('There is no delete paramater or its Invalid!')

		if (typeof deleteParamater == string) {
			await pool.query('DELETE FROM users WHERE userName = ?', [deleteParamater])
			console.log(`Successfuly deleted user with userName : ${deleteParamater}`)
		} else if (typeof deleteParamater == number) {
			await pool.query('DELETE FROM users WHERE id = ?', [deleteParamater])
			console.log(`Successfuly deleted user with ID : ${deleteParamater}`)
		} else throw new Error('[ERROR]: paramater must be either string or number!')
	},
}
