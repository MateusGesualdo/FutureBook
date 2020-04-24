import { Request, Response } from 'express'
import PostDB from '../../../data/postDatabase'
import CreatePostUC from '../../../business/usecases/posts/createPostUC'

export default async function createPostEndpoint(req: Request, res: Response) {
    const useCase = new CreatePostUC(new PostDB())

    try {
        await useCase.execute({
            token: req.headers.auth as string,
            type: req.body.type,
            description: req.body.description,
            image: req.body.image
        })
        res.status(200).send("Sucesso!")
    } catch (err) {
        res.status(500).send(err.message)
    }

}