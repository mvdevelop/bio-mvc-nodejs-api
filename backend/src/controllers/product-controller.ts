import mongoose from 'mongoose';
import Product from '../models/product';
import ValidationContract from '../validators/fluent-validator';
import repository from '../repositories/product-repository';

exports.get = async (req: any, res: any, next: any) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getBySlug = (req: any, res: any, next: any) => {
    repository.getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
}

exports.getById = (req: any, res: any, next: any) => {
    repository.getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req: any, res: any, next: any) => {
    repository.getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req: any, res: any, next: any) => {
    const contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository.create(req.body)
        .then(x => {
            res.status(201).send({
                message: 'Product registered successfully!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Error!',
                data: e
            });
        });
};

exports.put = (req: any, res: any, next: any) => {
    repository.update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({
                message: 'Product updated successfully!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Error!',
                data: e
            });
        });
};

exports.delete = (req: any, res: any, next: any) => {
    repository.delete(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Product deleted successfully!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Error!',
                data: e
            });
        });
};