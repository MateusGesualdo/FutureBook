import { Request, Response } from 'express'
import SignupUC from '../../../business/usecases/users/SignupUC'
import UserDB from '../../../data/UserDatabase'

export default async function signupEndpoint(req: Request, res: Response) {
  
    try {        
        const database = new UserDB()
        const useCase = new SignupUC(database)

        const result = await useCase.execute({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.status(200).send(result)
    } catch (err) {
        res.status(err.code || 500).send(err.message)
    }

}