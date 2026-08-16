import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

export default router;