import { IBook } from '@entities';
import { getRandomInt, logger } from '@shared';

import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IBookDao } from './BookDao';

export class BookDao extends MockDaoMock implements IBookDao {

    public async getAll(): Promise<IBook[]> {
        try {
            const db = await super.openDb();
            return db.books;
        } catch (err) {
            throw err;
        }
    }

    public async add(book: IBook): Promise<void> {
        try {
            const db = await super.openDb();
            book.id = getRandomInt().toString();
            db.books.push(book);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }

    public async update(book: IBook): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.books.length; i++) {
                if (db.books[i].id === book.id) {
                    db.books[i] = book;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('book not found');
        } catch (err) {
            throw err;
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            const db = await super.openDb();
            for (const i of db.books) {
                if (i.id === id) {
                    db.books.splice(db.books.indexOf(i), 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Book not found');
        } catch (err) {
            throw err;
        }
    }

    public async find(id: string): Promise<IBook[]> {
        try {
            const db = await super.openDb();
            for (const i of db.books) {
                if (i.id === id) {
                    return i;
                }
            }
            throw new Error('Book not found');
        } catch (err) {
            throw err;
        }
    }

    public async findAll(id: string): Promise<IBook[] | Error> {
        try {
            const db = await super.openDb();
            const books: any = [];
            for (const i of db.books) {
                if (i.authorID === id) {
                    books.push(i);
                }
            }
            if (books.length) {
                return books;
            } else {
                throw new Error('Books not found');
            }
        } catch (err) {
            throw err;
        }
    }
}
