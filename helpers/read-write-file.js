import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

export const read = async () => {
	const rawData = await fs.promises.readFile(`${__dirname}/data/data.json`, "utf8")
	return JSON.parse(rawData)
}

export const write = async (parsedData) => {
	const stringData = await fs.promises.writeFile(`${__dirname}/data/data.json`,
		JSON.stringify(parsedData, null, 4))
	return stringData

}