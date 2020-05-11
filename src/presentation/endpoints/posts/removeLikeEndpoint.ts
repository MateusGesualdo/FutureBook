import { Request, Response } from "express";
import PostDB from "../../../data/postDatabase";
import RemoveLikeUC from "../../../business/usecases/posts/removeLikeUC";

export default async function removeLikeEndpoint(req: Request, res: Response) {
    try {
        const database = new PostDB()
        const usecase = new RemoveLikeUC(database)

        await usecase.execute(
            req.headers.auth as string,
            req.params.postId
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