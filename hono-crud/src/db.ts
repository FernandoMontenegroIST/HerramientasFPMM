import mariadb from 'mariadb'
import dotenv from 'dotenv'

dotenv.config()

export const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  connectionLimit: 10,
  acquireTimeout: 10000
})
