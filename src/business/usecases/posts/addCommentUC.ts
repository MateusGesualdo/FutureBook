import PostDB from "../../../data/postDatabase";
import * as jwt from 'jsonwebtoken'
import { v4 } from 'uuid'

export default class AddCommentUC {
    constructor(private database: PostDB) { }

    async execute(input: AddCommentUCInput) {

        const commentId = v4()

        const jwtKey = process.env.JWT_KEY as string
        const jwtData = jwt.verify(input.token, jwtKey) as { id: string }

        if (jwtData.id) {
            await this.database.addComment({
                commentId,
                friendId: jwtData.id,
                postId: input.postId,
                commentText: input.commentText
            })
        } else {
            throw new Error("Não autorizado")
        }

    }
}

interface AddCommentUCInput {
    token: string,
    postId: string,
    commentText: string
}