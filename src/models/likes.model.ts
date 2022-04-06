import { Model, RelationMappings } from "objection";
import Post from "./posts.model";
import User from "./users.model";

export default class Like extends Model {
    
    like_id: number;
    fk_post_id: number;
    fk_user_id: number;

    static tablename: string = "likes";

    static get tableName(): string {
        return this.tablename;
    }

    static get idColumn(): string {
        return 'like_id';
    } 

    static relationMappings: RelationMappings = {

        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: "likes.fk_user_id",
                to: "users.user_id"
            }
        },

        posts: {
            relation: Model.BelongsToOneRelation,
            modelClass: Post,
            join: {
                from: "likes.fk_post_id",
                to: "post.post_id"
            }
        }
    }
}
