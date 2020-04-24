import { Request, Response } from 'express'
import UndoFriendshipUC from '../../../business/usecases/users/undoFriendshipUC'
import UserDB from '../../../data/UserDatabase'

export default async function undoFriendshipEndpoint(req: Request, res: Response) {

    try {
        const database = new UserDB()
        const useCase = new UndoFriendshipUC(database)

        await useCase.execute(
            req.headers.auth as string,
            req.params.friendId
        )

        res.status(200).send("Sucesso!")
    } catch (err) {
        res.send(err.message)
    }
}