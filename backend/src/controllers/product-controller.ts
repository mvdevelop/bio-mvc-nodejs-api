import { Request, Response } from 'express';
import ValidationContract from '../validators/fluent-validator';
import * as repository from '../repositories/product-repository';

export const get = async (_req: Request, res: Response) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const getBySlug = (req: Request, res: Response) => {
    repository
        .getBySlug(String(req.params.slug))
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

export const getById = (req: Request, res: Response) => {
    repository
        .getById(String(req.params.id))
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

export const getByTag = (req: Request, res: Response) => {
    repository
        .getByTag(String(req.params.tag))
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

export const post = (req: Request, res: Response) => {
    const contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres.');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .create(req.body)
        .then(() => {
            res.status(201).send({
                message: 'Product registered successfully!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Error!',
                data: e
            });
        });
};

export const put = (req: Request, res: Response) => {
    repository
        .update(String(req.params.id), req.body)
        .then(() => {
            res.status(200).send({
                message: 'Product updated successfully!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Error!',
                data: e
            });
        });
};

export const deleteProduct = (req: Request, res: Response) => {
    repository
        .deleteProduct(String(req.params.id))
        .then(() => {
            res.status(200).send({
                message: 'Product deleted successfully!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Error!',
                data: e
            });
        });
};