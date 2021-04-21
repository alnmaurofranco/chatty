const dotenv = require('dotenv')
const { resolve } = require('path')

dotenv.config({
  path:
    process.env.NODE_ENV !== 'production'
      ? resolve(__dirname, '.env.development')
      : resolve(__dirname, '.env.production')
})

module.exports = {
  type: 'postgres' || process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASS,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATION],
  cli: {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/database/migrations"
  }
}
