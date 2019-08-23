import { IBook } from '@entities';
import { getRandomInt } from '@shared';
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
            book.id = getRandomInt();
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

    public async delete(id: number): Promise<void> {
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

    public async find(id: number): Promise<IBook[]> {
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
}
