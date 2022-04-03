import { Knex } from "knex";
import { generateHash } from "../../utils/hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { user_id: 1, name: "Abhishek Chakraborty", email: "abhishek@example.com", password: generateHash("123456") },
        { user_id: 2, name: "John Doe", email: "john.doe@example.com", password: generateHash("123456")  },
        { user_id: 3, name: "Random Name", email: "random.name@example.com", password: generateHash("123456")  }
    ]);
};
