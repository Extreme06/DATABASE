import 'dotenv/config'
import path from 'path'
import express from 'express'
import { SQL } from './database.js'
const app = express()
const PORT = process.env.PORT
if (!PORT) {
	console.warn('[WARNING] : PORT not found in .env file, using default value instead')
	PORT = 3000
}

app.use(express.static(path.join(import.meta.dirname, 'src')))

app.get('/user', async (req, res) => {
	const id = parseInt(req.query.id)
	const userData = id ? await SQL.read(id) : await SQL.read()

	res.json(userData)
})

app.get('/', (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, 'index.html'))
})

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`)
})
