import { Request, Response } from "express";
import UserDB from "../../../data/UserDatabase";
import ChangePasswordUC from "../../../business/usecases/users/ChangePasswordUC";

async function changePasswordEndpoint(req: Request, res: Response) {
    try {
        const userDB = new UserDB()
        const changePassrordUC = new ChangePasswordUC(userDB)

        await changePassrordUC.execute(
            req.body.email,
            req.body.currentPassword,
            req.body.newPassword
        )

        res.status(200).send("Senha alterada")
    } catch (err){
        res.status(err.code || 500).send(err.message)
    }
}

export default changePasswordEndpoint;