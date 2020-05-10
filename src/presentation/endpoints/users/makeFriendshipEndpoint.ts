import { Request, Response } from 'express'
import MakeFriendshipUC from '../../../business/usecases/users/makeFriendshipUC'
import UserDB from '../../../data/UserDatabase'

export default async function makeFriendshipEndpoint(req: Request, res: Response) {

    try {
        const database = new UserDB()
        const useCase = new MakeFriendshipUC(database)

        await useCase.execute(
            req.headers.auth as string,
            req.params.friendId
        )

        res
            .status(200)
            .send({ message: "Sucesso!" })

    } catch (err) {
        res
            .status(err.code || 400)
            .send({ message: err.message })
    }
}