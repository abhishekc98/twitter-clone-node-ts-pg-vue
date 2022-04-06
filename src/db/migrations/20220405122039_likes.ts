import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
            .createTable("likes", (table: Knex.TableBuilder) => {
            table.increments("like_id").primary();
            table.integer("fk_user_id").references("user_id").inTable("users"),
            table.integer("fk_post_id").references("post_id").inTable("posts")
            table.timestamps(true, true)
            });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("likes")
}

