import { Request, Response } from "express";
import PostDB from "../../../data/postDatabase";
import removeLikeUC from "../../../business/usecases/posts/removeLikeUC";

export default async function removeLikeEndpoint(req: Request, res: Response) {
    try {
        const database = new PostDB()
        const usecase = new removeLikeUC(database)
        
        await usecase.execute(
            req.headers.auth as string,
            req.params.postId
        )

        res.status(200).send("Sucesso!")
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
}