import { Model, RelationMappings } from "objection";
import User from "./users.model";

export default class Post extends Model {

    // tsconfig "strictPropertyInitialization": false   
    post_id: number;
    fk_user_id: number;
    text: string;

    static tablename = "posts";

    static get tableName(): string {
        return this.tablename;
    }

    // id name is different than default name "id"
    static get idColumn(): string {
        return 'post_id';
    }

    static relationMappings: RelationMappings = {
        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: "posts.fk_user_id",
                to: "users.user_id"
            }
        }
    }
}
