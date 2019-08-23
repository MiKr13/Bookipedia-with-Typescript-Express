import { BookDao } from '@daos';
import { GraphQLObjectType, GraphQLSchema, GraphQLID } from 'graphql';

import { BookSchema } from './Book';
import { logger } from '@shared';

const Book = new BookDao();

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookSchema,
            args: {
                id: { type: GraphQLID },
            },
            async resolve(parent, args) {
                // query ID from some DB
                try {
                    return await Book.find(args.id);
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
    },
});

export const RootSchema = new GraphQLSchema({
    query: RootQuery,
});
