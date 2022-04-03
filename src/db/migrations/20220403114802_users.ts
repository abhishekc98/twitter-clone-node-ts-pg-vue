import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
          .createTable("users", (table: Knex.TableBuilder) => {
            table.increments("user_id").primary();
            table.string("name").notNullable();
            table.string("email").notNullable();
            table.string("password").notNullable();
            table.timestamps(true, true)
          });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

