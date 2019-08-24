import { IAuthor } from '@entities';
import { DB } from './../controllers/mongoose';
import { logger } from '@shared';

export interface IAuthorDao {
    getAll: () => Promise<IAuthor[]>;
    add: (author: IAuthor) => Promise<void>;
    update: (author: IAuthor) => Promise<void>;
    delete: (id: string) => Promise<void>;
    find: (id: string) => Promise<IAuthor>;
}

export class AuthorDao implements IAuthorDao {

    /**
     *
     */
    public async getAll(): Promise<IAuthor[]> {
        try {
            const data = await DB.Models.Author.find().exec();
            return data;
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     * @param author
     */
    public async add(author: IAuthor): Promise<void> {
        try {
            await new DB.Models.Author(author).save();
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     * @param author
     */
    public async update(author: IAuthor): Promise<void> {
        try {
            await DB.Models.Author
                .findOneAndUpdate({ _id: author._id }, new DB.Models.Author(author), { new: true }).exec();
            throw new Error('Author not found');
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     * @param _id
     */
    public async delete(_id: string): Promise<void> {
        try {
            await DB.Models.Author.findByIdAndDelete({ _id }).exec();
            throw new Error('Author not found');
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     * @param _id
     */
    public async find(_id: string): Promise<IAuthor> {
        try {
            const data = await DB.Models.Author.find({ _id }).exec();
            if (data) {
                return data[0];
            }
            throw new Error('Author not found');
        } catch (err) {
            throw err;
        }
    }

}
