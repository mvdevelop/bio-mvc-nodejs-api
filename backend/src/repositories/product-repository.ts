import Product, { IProduct } from '../models/product';

export const get = async () => {
    const res = await Product.find({
        active: true
    }, 'title price slug');
    return res;
}

export const getBySlug = (slug: string) => {
    return Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags');
}

export const getById = (id: string) => {
    return Product.findById(id);
}

export const getByTag = (tag: string) => {
    return Product.find({
        tags: tag,
        active: true
    }, 'title description price slug tags');
}

export const create = (data: Partial<IProduct>) => {
    const product = new Product(data);
    return product.save();
}

export const update = (id: string, data: Pick<IProduct, 'title' | 'description' | 'price' | 'slug'>) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

export const deleteProduct = (id: string) => {
    return Product.findByIdAndDelete(id);
}