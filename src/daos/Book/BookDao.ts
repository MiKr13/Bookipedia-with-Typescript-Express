import { IBook } from '@entities';
import { DB } from './../controllers/mongoose';

export interface IBookDao {
    getAll: () => Promise<IBook[]>;
    add: (book: IBook) => Promise<IBook>;
    update: (book: IBook) => Promise<void>;
    delete: (id: string) => Promise<void>;
    find: (id: string) => Promise<IBook>;
    findAllByAuthorID: (id: string) => Promise<IBook[] | Error>;
}

export class BookDao implements IBookDao {

    /**
     *
     */
    public async getAll(): Promise<IBook[]> {
        try {
            const data = await DB.Models.Book.find().exec();
            return data;
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     * @param book
     */
    public async add(book: IBook): Promise<IBook> {
        try {
            const data = await new DB.Models.Book(book).save();
            return data;
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     * @param book
     */
    public async update(book: IBook): Promise<void> {
        try {
            await DB.Models.Book.findOneAndUpdate({_id: book._id}, new DB.Models.Book(book), {new: true}).exec();
            throw new Error('Book not found');
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
            await DB.Models.Book.findByIdAndDelete({_id}).exec();
            throw new Error('Book not found');
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     * @param _id
     */
    public async find(_id: string): Promise<IBook> {
        try {
            const data = await DB.Models.Book.find({_id}).exec();
            if (data) {
                return data[0];
            }
            throw new Error('Book not found');
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     * @param _id
     */
    public async findAllByAuthorID(_id: string): Promise<IBook[] | Error> {
        try {
            const data = await DB.Models.Book.find({authorID: _id}).exec();
            if (data) {
                return data;
            }
            throw new Error('Book not found');
        } catch (err) {
            throw err;
        }
    }

}
