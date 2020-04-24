import UserDB from "../../../data/UserDatabase";
import * as jwt from 'jsonwebtoken'

export default class MakeFriendshipUC {
    constructor(private database: UserDB) { }

    async execute(token: string, friendId: string) {
        const jwtSecretKey: string = process.env.JWT_KEY as string
        const jwtData = jwt.verify(
            token as string, jwtSecretKey
        ) as {
            id: string
        }
        await this.database.makeFriendship(
            jwtData.id,
            friendId
        )
    }
}