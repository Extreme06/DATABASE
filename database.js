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

        try {
            const [response] = !id
                ? await pool.query('SELECT * FROM users')
                : await pool.query('SELECT * FROM users WHERE id=?', [id])

            const userData = JSON.stringify(response, null, 2)

            // response = '[]' if cant find user with such ID
            if (response.length <= 2) return 0

            return userData
        } catch (err) {
            throw new Error('Failed to GET user with ID: ' + id, err)
        }
    },

    insert: async (first_name, last_name, email = '/') => {
        if (!first_name || !last_name) throw new Error('[DATABASE ERROR]: Invalid values for names')

        try {
            const [result] = await pool.query(
                'INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)',
                [first_name.toString(), last_name.toString(), email.toString()],
            )
            console.log(
                `User [${first_name} ${last_name}] successfully inserted into Database with ID: [${result.insertId}]`,
            )
            return result.insertId
        } catch (error) {
            console.error('[DATABASE ERROR]: ', error.message)
            return null
        }
    },

    delete: async (deleteParamater = 0) => {
        if (!deleteParamater) throw new Error('There is no delete paramater or its Invalid!')

        if (deleteParamater.isNan()) {
            //if its not a number, it's name
            await pool.query('DELETE FROM users WHERE first_name = ?', [deleteParamater])
            console.log(`Successfuly deleted user with first_name : ${deleteParamater}`)
        } else {
            //if its number, delete by ID
            await pool.query('DELETE FROM users WHERE id = ?', [deleteParamater])
            console.log(`Successfuly deleted user with ID : ${deleteParamater}`)
        }
    },
}
