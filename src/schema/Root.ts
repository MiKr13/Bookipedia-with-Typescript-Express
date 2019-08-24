import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } from 'graphql';

import { logger } from '@shared';
import { BookDao, AuthorDao } from '@daos';

import { BookObjectType } from './Book';
import { AuthorObjectType } from './Author';
import { resolve } from 'path';

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
                try {
                    return await Author.find(args.id);
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
        books: {
            type: new GraphQLList(BookObjectType),
            async resolve(parent, args) {
                try {
                    return await Book.getAll();
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
        authors: {
            type: new GraphQLList(AuthorObjectType),
            async resolve(parent, args) {
                try {
                    return await Author.getAll();
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
