import { IBook } from '@entities';

export interface IBookDao {
    getAll: () => Promise<IBook[]>;
    add: (user: IBook) => Promise<void>;
    update: (user: IBook) => Promise<void>;
    delete: (id: number) => Promise<void>;
    find: (id: number) => Promise<IBook[]>;
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
    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param id
     */
    public async find(id: number): Promise<IBook[]> {
        return [] as any;
    }
}
