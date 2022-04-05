import { Model, RelationMappings } from "objection";
import Post from "./posts.model";


export default class User extends Model {

    // tsconfig "strictPropertyInitialization": false   
    user_id: number;
    name: string;
    email: string;
    password: string;

    static tablename = "users";

    static get tableName(): string {
        return this.tablename;
    }

    // id name is different than default name "id"
    static get idColumn(): string {
        return 'user_id';
    }

    static relationMappings: RelationMappings = {
        posts: {
            relation: Model.HasManyRelation,
            modelClass: Post,
            filter: query => query.select('user_id', 'name', 'email'),
            join: {
                from: "users.user_id",
                to: "posts.fk_user_id"
            }

        }    
    }
}
