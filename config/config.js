import dotenv from 'dotenv'
dotenv.config()

const config = {

	development: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DATABASE,
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
	production: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DATABASE,
		host: process.env.DATABASE_HOST,
		dialect: process.env.DATABASE_DIALECT,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	}
}

export default config