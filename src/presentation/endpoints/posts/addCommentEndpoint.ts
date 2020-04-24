import { Request, Response } from "express";
import PostDB from "../../../data/postDatabase";
import AddCommentUC from "../../../business/usecases/posts/addCommentUC";

export default async function addCommentEndpoint(req: Request, res: Response) {
    try {
        const database = new PostDB()
        const usecase = new AddCommentUC(database)
        
        await usecase.execute({
            token: req.headers.auth as string,
            postId: req.params.postId,
            commentText: req.body.commentText
        })

        res.status(200).send("Sucesso!")
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
}