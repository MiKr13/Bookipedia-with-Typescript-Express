import { GraphQLObjectType, GraphQLSchema, GraphQLID } from 'graphql';

import { logger } from '@shared';
import { BookDao, AuthorDao } from '@daos';

import { BookObjectType } from './Book';
import { AuthorObjectType } from './Author';

const Book = new BookDao();
const Author = new AuthorDao();

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookObjectType,
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
        author: {
            type: AuthorObjectType,
            args: {
                id: { type: GraphQLID },
            },
            async resolve(parent, args) {
                // query ID from some DB
                try {
                    return await Author.find(args.id);
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
