import * as jwt from 'jsonwebtoken'
import PostDB from "../../../data/postDatabase";
import { PostType } from '../../entities/post';


export default class GetFeedUC {
    constructor(
        private database: PostDB
    ) { }

    async execute(token: string, type: string) {

        let postType

        if (type === "normal") {
            postType = PostType.normal
        } else if (type === "event") {
            postType = PostType.event
        } else {
            throw new Error("Tipo de post inválido")
        }

        const tokenData = jwt.verify(
            token, process.env.JWT_KEY as string
        ) as {
            id: string
        }

        const feed = await this.database.getFeedByType(
            tokenData.id, 0, postType
        )

        return feed


    }
}