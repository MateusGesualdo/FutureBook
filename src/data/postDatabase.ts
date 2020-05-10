import MainDB from "./MainDatabase";
import Post, { PostType } from "../business/entities/post";

export default class PostDB extends MainDB {

    async createPost(post: Post) {
        try {
            await this.connection.raw(
                `INSERT INTO future_book_posts VALUES (
                "${post.getId()}",
                "${post.getAuthorId()}",
                "${post.getDescription()}",
                "${post.getCreationDate()}",
                "${post.getType()}",
                "${post.getImage()}"
            )`
            )
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async getFeed(id: string) {
        try {
            const query = await this.connection.raw(
                `SELECT future_book_posts.*, name as author_name
                FROM future_book_friends 
                JOIN future_book_posts ON friend_id = author_id
                JOIN future_book_users ON author_id = future_book_users.id
                WHERE user_id = "${id}"
                ORDER BY creation_date;`
            )

            return query[0]
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async getFeedByType(id: string, type: PostType) {
        try {
            const query = await this.connection.raw(
                `SELECT future_book_posts.*, name as author_name
                FROM future_book_friends 
                JOIN future_book_posts ON friend_id = author_id
                JOIN future_book_users ON author_id = future_book_users.id
                WHERE user_id = "${id}"
                AND type = "${type}"
                ORDER BY creation_date;`
            )

            return query[0]
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async addLike(friendId: string, postId: string) {
        try {
            await this.connection.raw(
                `INSERT INTO future_book_likes VALUES (
                    "${friendId}", 
                    "${postId}"
                )`
            )
        } catch (err) {
            if (err.sqlMessage.includes("Duplicate entry")) {
                throw new Error("Post já curtido pelo usuário")
            } else if (err.sqlMessage.includes("constraint fails")) {
                throw new Error("id do post inválido")
            } else {
                throw new Error(`Erro inesperado no banco de dados: ${err.sqlMessage}`)
            }
        }
    }

    async removeLike(friendId: string, postId: string) {
        try {
            await this.connection.raw(
                `DELETE FROM future_book_likes 
                WHERE friend_id = "${friendId}"
                AND post_id = "${postId}"`
            )
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async addComment(input: AddCommentInput) {
        try {
            await this.connection.raw(
                `INSERT INTO future_book_comments VALUES (
                    "${input.commentId}",
                    "${input.friendId}", 
                    "${input.postId}",
                    "${input.commentText}"
                )`
            )
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }
}

interface AddCommentInput {
    commentId: string,
    friendId: string,
    postId: string,
    commentText: string
}