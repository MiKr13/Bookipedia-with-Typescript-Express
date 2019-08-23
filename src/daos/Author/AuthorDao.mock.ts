import { IAuthor } from '@entities';
import { getRandomInt } from '@shared';

import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IAuthorDao } from './AuthorDao';

export class AuthorDao extends MockDaoMock implements IAuthorDao {

    public async getAll(): Promise<IAuthor[]> {
        try {
            const db = await super.openDb();
            return db.authors;
        } catch (err) {
            throw err;
        }
    }

    public async add(author: IAuthor): Promise<void> {
        try {
            const db = await super.openDb();
            author.id = getRandomInt().toString();
            db.authors.push(author);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }

    public async update(author: IAuthor): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.authors.length; i++) {
                if (db.authors[i].id === author.id) {
                    db.authors[i] = author;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Author not found');
        } catch (err) {
            throw err;
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            const db = await super.openDb();
            for (const i of db.authors) {
                if (i.id === id) {
                    db.authors.splice(db.authors.indexOf(i), 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Author not found');
        } catch (err) {
            throw err;
        }
    }

    public async find(id: string): Promise<IAuthor[]> {
        try {
            const db = await super.openDb();
            for (const i of db.authors) {
                if (i.id === id) {
                    return i;
                }
            }
            throw new Error('Author not found');
        } catch (err) {
            throw err;
        }
    }
}
