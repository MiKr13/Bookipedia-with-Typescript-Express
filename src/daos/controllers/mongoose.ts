import { connect, connection, Connection, model } from 'mongoose';

import { Book, IBookModel } from '@entities';
import { Author, IAuthorModel } from '@entities';
import { logger } from '@shared';

declare interface IModels {
    Book: IBookModel;
    Author: IAuthorModel;
}

export class DB {

    private static instance: DB;

    private mongoDB: Connection;
    private models: IModels;

    constructor() {
        connect(process.env.MONGO_URI as string, { useNewUrlParser: true });
        this.mongoDB = connection;
        this.mongoDB.on('open', this.connected);
        this.mongoDB.on('error', this.error);

        this.models = {
            Book: new Book().model,
            Author: new Author().model,
        };
    }

    public static get Models() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance.models;
    }

    private connected() {
        logger.info('Mongoose has connected');
    }

    private error(error: Error) {
        logger.info('Mongoose has errored', error);
    }
}
