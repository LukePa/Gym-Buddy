import type {RequestHandler} from "express";


export const notFound: RequestHandler = (req, res) => {
    res.status(404).send({error: "Sorry! Not found"})
}