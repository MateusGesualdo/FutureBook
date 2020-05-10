import * as jwt from 'jsonwebtoken'
import PostDB from "../../../data/postDatabase";


export default class GetFeedUC {
    constructor(
        private database: PostDB
    ) { }

    async execute(token: string) {
        let tokenData
        try {
            tokenData = jwt.verify(
                token, process.env.JWT_KEY as string
            ) as {
                id: string
            }
        } catch (err) {
            throw new Error("Falha na autenticação")
        }


        const feed = await this.database.getFeed(
            tokenData.id
        )

        return {
            message: "Sucesso!",
            feed
        }


    }
}