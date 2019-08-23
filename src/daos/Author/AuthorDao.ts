import { IAuthor } from '@entities';

export interface IAuthorDao {
    getAll: () => Promise<IAuthor[]>;
    add: (book: IAuthor) => Promise<void>;
    update: (book: IAuthor) => Promise<void>;
    delete: (id: string) => Promise<void>;
    find: (id: string) => Promise<IAuthor[]>;
}

export class BookDao implements IAuthorDao {

    /**
     *
     */
    public async getAll(): Promise<IAuthor[]> {
        // TODO
        return [] as any;
    }

    /**
     *
     * @param book
     */
    public async add(book: IAuthor): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param book
     */
    public async update(book: IAuthor): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param id
     */
    public async delete(id: string): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param id
     */
    public async find(id: string): Promise<IAuthor[]> {
        return [] as any;
    }
}
