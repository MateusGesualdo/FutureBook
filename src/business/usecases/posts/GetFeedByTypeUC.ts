import * as jwt from 'jsonwebtoken'
import PostDB from "../../../data/postDatabase";
import { PostType } from '../../entities/post';


export default class GetFeedUC {
    constructor(
        private database: PostDB
    ) { }

    async execute(token: string, type: string) {

        let postType, tokenData

        if (type === "NORMAL") {
            postType = PostType.normal
        } else if (type === "EVENT") {
            postType = PostType.event
        } else {
            throw new Error("Erro: Tipo de post deve ser 'NORMAL' ou 'EVENT' ")
        }

        try {
            tokenData = jwt.verify(
                token, process.env.JWT_KEY as string
            ) as {
                id: string
            }
        } catch{
            throw new Error("Falha na autenticação")
        }


        const feed = await this.database.getFeedByType(
            tokenData.id, postType
        )

        return {
            message: "Sucesso!",
            feed
        }


    }
}