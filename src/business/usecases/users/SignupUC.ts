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
        const newUser = new User(
            id,
            input.email,
            hashPassword,
            input.name
        )

        await this.database.signup(newUser)

        const jwtSecretKey = process.env.JWT_KEY as string
        const token = jwt.sign(
            { id },
            jwtSecretKey,
            { expiresIn: "2h" }
        )
        return {
            message: "Usuário criado.",
            token,
            user_public_info: {
                id:newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail()
            }
        }
    }
}