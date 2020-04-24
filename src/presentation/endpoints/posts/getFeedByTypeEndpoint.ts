import { Request, Response } from 'express'
import GetFeedByTypeUC from '../../../business/usecases/posts/GetFeedByTypeUC'
import PostDB from '../../../data/postDatabase'

export default async function getFeedByTypeEndpoint(
    req: Request, res: Response
) {

    const useCase = new GetFeedByTypeUC(new PostDB())
    try {
        const result = await useCase.execute(
            req.headers.auth as string,
            req.params.type
        )

        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }

}