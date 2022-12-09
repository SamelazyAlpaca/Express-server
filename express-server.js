import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import path from 'path'
const __dirname = path.resolve()
import recursiveReadSync from 'recursive-readdir-sync'

const app = express()
app.use(cors())
app.use(express.json())

recursiveReadSync(`${__dirname}/routes`)
	.forEach(async (file) => {
		const module = await import(file)
		app.use('/user', module.default)
	});

app.listen(process.env.BASE_PORT, () => {
	console.log(`Server llistening on Port ${process.env.BASE_PORT}`);
})