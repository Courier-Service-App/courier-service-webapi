import 'reflect-metadata'
import { DataSource } from 'typeorm'
import Entities from './entity'
import { CONFIG } from './configs/config'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: CONFIG.DB_HOST,
    port: 5432,
    username: CONFIG.DB_USER,
    password: CONFIG.DB_PASSWORD,
    database: CONFIG.DB_NAME,
    synchronize: true,
    logging: false,
    entities: Entities,
    migrations: [],
    subscribers: [],
})
