import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } from 'graphql';

import { logger } from '@shared';
import { BookDao, AuthorDao } from '@daos';

import { BookObjectType, addBook } from './Book';
import { AuthorObjectType, addAuthor } from './Author';

const Book = new BookDao();
const Author = new AuthorDao();

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookObjectType,
            args: {
                _id: { type: GraphQLID },
            },
            async resolve(parent: any, args: any) {
                // query ID from some DB
                try {
                    return await Book.find(args._id);
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
        author: {
            type: AuthorObjectType,
            args: {
                _id: { type: GraphQLID },
            },
            async resolve(parent: any, args: any) {
                try {
                    return await Author.find(args._id);
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
        books: {
            type: new GraphQLList(BookObjectType),
            async resolve(parent: any, args: any) {
                try {
                    return await Book.getAll();
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
        authors: {
            type: new GraphQLList(AuthorObjectType),
            async resolve(parent: any, args: any) {
                try {
                    return await Author.getAll();
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook,
        addAuthor,
    },
});

export const RootSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
