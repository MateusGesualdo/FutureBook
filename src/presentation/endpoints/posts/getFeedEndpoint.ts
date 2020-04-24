import { Request, Response } from 'express'
import GetFeedUC from '../../../business/usecases/posts/GetFeedUC'
import PostDB from '../../../data/postDatabase'

export default async function getFeedEndpoint(
    req: Request, res: Response
) {

    const useCase = new GetFeedUC(new PostDB())
    try {
        const result = await useCase.execute(
            req.headers.auth as string
        )

        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }

}