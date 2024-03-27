import 'reflect-metadata'
import { DataSource } from 'typeorm'
import Entities from './entity'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "courierdbuser",
    password: ",88+B-8)N[V*B5e%B1R[Bd",
    database: "courierservice",
    synchronize: true,
    logging: false,
    entities: Entities,
    migrations: [],
    subscribers: [],
})
