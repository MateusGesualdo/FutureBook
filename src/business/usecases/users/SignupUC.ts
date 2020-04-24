import UserDB from "../../../data/UserDatabase";
import User from "../../entities/User";
import { v4 } from "uuid";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

interface SignupInput {
    name: string
    email: string
    password: string
}

export default class SignupUC {
    constructor(private database: UserDB) { }

    async execute(input: SignupInput) {

        if (!input.name || !input.email || !input.password) {
            throw new Error("Dados insuficientes")
        }

        const id = v4()
        const rounds = 10
        const hashPassword = await bcrypt.hash(input.password, rounds)

        await this.database.signup(new User(
            id,
            input.email,
            hashPassword,
            input.name
        ))

        const jwtSecretKey = process.env.JWT_KEY as string
        const token = jwt.sign(
            { id },
            jwtSecretKey,
            { expiresIn: "2h" }
        )
        return {
            message: "Usuário criado.",
            token
        }
    }
}