import { Request, Response } from 'express'
import GetProfileUC from '../../../business/usecases/users/GetProfileUC'
import UserDB from '../../../data/UserDatabase'

export default async function getProfileEndpoint(req: Request, res: Response) {

    const useCase = new GetProfileUC(new UserDB())
    
    try {
        const result = await useCase.execute(req.headers.auth)

        res.send(result)
    } catch (err) {
        res.send(err.message)
    }
}