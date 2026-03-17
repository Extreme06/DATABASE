import 'dotenv/config'
import path from 'path'
import express from 'express'
import { SQL } from './controllers/database.script.js'
const app = express()
const PORT = process.env.PORT || 3000
if (PORT === 3000)
	console.log('[WARNING] : PORT not found in .env file, using default value instead')

//middlewares
app.use(express.static(path.join(import.meta.dirname, 'src')))
app.use(express.json())

app.post('/user', async (req, res) => {
	console.log('This is req.body:')
	console.log(req.body)
	const user = req.body
	const { name, email, password } = req.body
	await SQL.insert(name, email, password)
})

app.get('/user', async (req, res) => {
	try {
		const requestedID = parseInt(req.query.id)

		requestedID
			? console.log(`Client requested user with id: [${requestedID}]`)
			: console.log('Client requested all users from DB')

		const userData = requestedID ? await SQL.read(requestedID) : await SQL.read()
		res.json({ success: true, data: userData })
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message,
		})
	}
})

app.get('/', (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, 'index.html'))
})

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`)
})
