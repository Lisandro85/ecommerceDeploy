import { DataSource, DataSourceOptions} from "typeorm";
import {config as dotenvConfig} from 'dotenv';
import { registerAs } from "@nestjs/config";

dotenvConfig({path:'./.env'})

const config={
    type: 'postgres',   
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    // host:'postgresdb',
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities:true,
    synchronize:true,
    dropSchema:false,
    logging:false,
    entities:['dist/**/*.entity{.ts,.js}'],
    migrations:['dist/migrations/*{.js,.ts}']
}

export const typeOrmConfig= registerAs('typeorm',()=>config)
export const connectionSource=new DataSource (config as DataSourceOptions)