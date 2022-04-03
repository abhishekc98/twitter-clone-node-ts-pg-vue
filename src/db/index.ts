import knex from 'knex';
import * as knexFile from './knexfile'
import { Model } from 'objection';

export const connectDB = () => {
    try 
    {
        const knexConnection = knex <any,Record<string, any>[]> (knexFile);
        Model.knex(knexConnection);
        console.log("Database connected");
    } 
    catch (error: any) 
    {
        console.error(error.message);
        process.exit(1);
    }
}

