import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
    title: string;
    slug: string;
    description: string;
    price: number;
    active: boolean;
    tags: string[];
}

const schema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }]
});

export default mongoose.model<IProduct>('Product', schema);