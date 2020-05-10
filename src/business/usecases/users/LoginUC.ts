import UserDB from "../../../data/UserDatabase";
import User from "../../entities/User";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface LoginInput {
    email: string
    password: string
}

export default class LoginUC {
    constructor(private database: UserDB) { }

    async execute(input: LoginInput) {

        if (!input.email || !input.password) {
            throw new Error(
                "Dados insuficientes"
            )
        }

        const user = await this.database.getUserByEmail(input.email)

        if (!user) throw new Error("Usuário não encontrado ou senha incorreta.")

        const isPasswordCorrect = await bcrypt.compare(input.password, user.password)
        const jwtSecretKey = process.env.JWT_KEY as string

        if (isPasswordCorrect) {
            const token = jwt.sign(
                { id: user.id },
                jwtSecretKey,
                { expiresIn: "2h" }
            )
            return {
                message: "Usuário logado.",
                token,
                user_public_info: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        } else {
            throw new Error(
                "Usuário não encontrado ou senha incorreta."
            )

        }
    }
}