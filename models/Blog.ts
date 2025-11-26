import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    content: string;
    date: Date;
}

const BlogSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this blog post.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
        type: String,
        required: [true, 'Please provide a slug for this blog post.'],
        unique: true,
        index: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide the content for this blog post.'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Check if the model already exists to prevent overwrite error in hot reloading
const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
