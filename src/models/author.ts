import { Schema, model, Document, Model } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    age: number;
    favouriteGenre: string;
}

export interface IAuthorModel extends Model<IAuthor> {}

export class Author {

    private authorModel: Model<IAuthor>;

    constructor() {
        const schema =  new Schema({
            name: { type: String, required: true },
            age: { type: String, required: true },
            favouriteGenre: { type: String, required: true },
        });

        this.authorModel = model<IAuthor>('Author', schema);
    }

    public get model(): Model<IAuthor> {
        return this.authorModel;
    }
}
