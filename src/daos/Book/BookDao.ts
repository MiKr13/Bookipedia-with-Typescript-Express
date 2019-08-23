import { IBook } from '@entities';

export interface IBookDao {
    getAll: () => Promise<IBook[]>;
    add: (user: IBook) => Promise<void>;
    update: (user: IBook) => Promise<void>;
    delete: (id: string) => Promise<void>;
    find: (id: string) => Promise<IBook[]>;
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
     * @param user
     */
    public async add(user: IBook): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param user
     */
    public async update(user: IBook): Promise<void> {
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
}
