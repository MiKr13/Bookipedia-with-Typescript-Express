import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } from 'graphql';

import { logger } from '@shared';
import { AuthorDao, BookDao } from '@daos';

import { AuthorObjectType } from './Author';

const Author = new AuthorDao();
const Book = new BookDao();

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorObjectType,
            async resolve(parent, args) {
                try {
                    return await Author.find(parent.authorID);
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
    }),
});

const addBookMutation = {
    type: BookType,
    args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorID: { type: GraphQLID },
    },
    async resolve(parent: any, args: any) {
        try {
            return await Book.add({
                name: args.name,
                genre: args.genre,
                authorID: args.authorID,
            });
        } catch (err) {
            logger.error(err.message, err);
        }
    },
};

export const BookObjectType = BookType as any;
export const addBook = addBookMutation as any;
