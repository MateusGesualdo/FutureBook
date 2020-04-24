import * as bcrypt from 'bcrypt'
import UserDB from "../../../data/UserDatabase";

export default class ChangePasswordUC {
    constructor(private database: UserDB) { }

    async execute(
        email: string,
        currentPassword: string,
        newPassword: string
    ) {
        if (!email || !currentPassword || !newPassword) {
            throw new Error("Dados insuficientes")
        }

        const user = await this.database.getUserByEmail(email)
        const passwordIsCorrect = await bcrypt.compare(
            currentPassword, user.password
        )
        
        if (passwordIsCorrect) {
            const rounds = 10
            const newHashPassword = await bcrypt.hash(
                newPassword,
                rounds
            )
            await this.database.changePassword(
                email,
                newHashPassword as string
            )
        } else {
            throw new Error("Email ou senha inválidos")
        }

    }
}