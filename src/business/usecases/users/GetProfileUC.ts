import UserDB from "../../../data/UserDatabase";
import * as jwt from 'jsonwebtoken';

export default class GetProfileUC {
    constructor(
        private database: UserDB
    ) { }

    async execute(token: any) {

        const jwtSecretKey: string = process.env.JWT_KEY as string
        const jwtData = jwt.verify(
            token as string,
            jwtSecretKey
        ) as {
            id: string,
            email: string
        }

        const user = await this.database.getUserByEmail(jwtData.email)
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            birthDate: user.birth_date
        }
    }
}