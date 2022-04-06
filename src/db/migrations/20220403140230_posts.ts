import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
          .createTable("posts", (table: Knex.TableBuilder) => {
            table.increments("post_id").primary();
            table.integer("fk_user_id").references("user_id").inTable("users")
            table.string("text").notNullable();
            table.timestamps(true, true)
          });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("posts")
}

