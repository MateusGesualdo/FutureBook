import * as jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import Post, { PostType } from "../../entities/post";
import PostDB from "../../../data/postDatabase";

export default class CreatePostUC {
    constructor(
        private database: PostDB
    ) { }

    mapDateToDBDate = (date: Date) => {
        return String(
            date.getFullYear() + '-' +
            Number(date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds()
        )
    }


    async execute(input: InputInterface) {
        const jwtSecretKey: string = process.env.JWT_KEY as string
        let jwtData

        try {
            jwtData = jwt.verify(input.token, jwtSecretKey) as {
                id: string,
                email: string
            }
        } catch (err) {
            throw new Error("Falha na autenticação")
        }

        const id = v4()
        const authorId = jwtData.id
        let type: PostType
        if (input.type === "NORMAL") {
            type = PostType.normal
        } else if (input.type === "EVENT") {
            type = PostType.event
        } else {
            throw new Error("Erro: Tipo de post deve ser 'NORMAL' ou 'EVENT' ")
        }
        const creationTime = this.mapDateToDBDate(new Date())

        await this.database.createPost(new Post(
            id,
            authorId,
            input.description,
            creationTime,
            type,
            input.image
        ))

    }
}

interface InputInterface {
    token: string
    description: string
    type: PostType
    image: string
}