import PostDB from "../../../data/postDatabase";
import * as jwt from 'jsonwebtoken'

export default class removeLikeUC {
    constructor(private database: PostDB) { }

    async execute(token: string, postId: string) {

        const jwtKey = process.env.JWT_KEY as string
        const jwtData = jwt.verify(token, jwtKey) as { id: string }

        if (jwtData.id) {
            await this.database.removeLike(jwtData.id, postId)
        } else {
            throw new Error("Não autorizado")
        }

    }
}