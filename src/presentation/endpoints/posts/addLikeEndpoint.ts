import { Request, Response } from "express";
import PostDB from "../../../data/postDatabase";
import AddLikeUC from "../../../business/usecases/posts/addLikeUC";

export default async function addLikeEndpoint(req: Request, res: Response) {
    try {
        const database = new PostDB()
        const usecase = new AddLikeUC(database)

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