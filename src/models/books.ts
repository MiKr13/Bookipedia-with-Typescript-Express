import { Schema, model, Document, Model } from 'mongoose';

export interface IBook extends Document {
    name: string;
    genre: string;
    authorID: string;
}

export interface IBookModel extends Model<IBook> {}

export class Book {

    private bookModel: Model<IBook>;

    constructor() {
        const schema =  new Schema({
            name: { type: String, required: true },
            genre: { type: String, required: true },
            authorID: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
        });

        this.bookModel = model<IBook>('Book', schema);
    }

    public get model(): Model<IBook> {
        return this.bookModel;
    }
}
