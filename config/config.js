import dotenv from 'dotenv'
dotenv.config()

const config = {

	development: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE.PASSWORD,
		database: process.env.DATABASE_DATABASE,
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT
	},
	test: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE.PASSWORD,
		database: process.env.DATABASE_DATABASE,
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT
	},
	production: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE.PASSWORD,
		database: process.env.DATABASE_DATABASE,
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT
	}
}

export default config