import UserDB from "../../../data/UserDatabase";
import * as jwt from 'jsonwebtoken'

export default class MakeFriendshipUC {
    constructor(private database: UserDB) { }

    async execute(token: string, friendId: string) {
        const jwtSecretKey: string = process.env.JWT_KEY as string
        let jwtData

        try {
            jwtData = jwt.verify(
                token as string, jwtSecretKey
            ) as {
                id: string
            }
        } catch (err) {
            throw new Error("Falha de autenticação")
        }

        await this.database.makeFriendship(
            jwtData.id,
            friendId
        )
    }
}