import { IBook } from '@entities';

export interface IBookDao {
    getAll: () => Promise<IBook[]>;
    add: (book: IBook) => Promise<void>;
    update: (book: IBook) => Promise<void>;
    delete: (id: string) => Promise<void>;
    find: (id: string) => Promise<IBook[]>;
    findAll: (id: string) => Promise<IBook[] | Error>;
}

export class BookDao implements IBookDao {

    /**
     *
     */
    public async getAll(): Promise<IBook[]> {
        // TODO
        return [] as any;
    }

    /**
     *
     * @param book
     */
    public async add(book: IBook): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param book
     */
    public async update(book: IBook): Promise<void> {
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
    public async find(id: string): Promise<IBook[]> {
        return [] as any;
    }

    /**
     *
     * @param id
     */
    public async findAll(id: string): Promise<IBook[] | Error> {
        return [] as any;
    }
}
