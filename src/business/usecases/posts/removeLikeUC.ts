import PostDB from "../../../data/postDatabase";
import * as jwt from 'jsonwebtoken'

export default class removeLikeUC {
    constructor(private database: PostDB) { }

    async execute(token: string, postId: string) {

        const jwtKey = process.env.JWT_KEY as string
        let jwtData

        try {
            jwtData = jwt.verify(token, jwtKey) as { id: string }
        } catch{
            throw new Error("Falha na autenticação")
        }

        await this.database.removeLike(jwtData.id, postId)
    }
}