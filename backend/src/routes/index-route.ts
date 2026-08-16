import express from 'express';

const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

export default router;