import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';

import { logger } from '@shared';
import { BookDao } from '@daos';

import { BookObjectType } from './Book';

const Book = new BookDao();

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        favouriteGenre: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookObjectType),
            async resolve(parent, args) {
                try {
                    return await Book.findAll(parent.id);
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
    }),
});

export const AuthorObjectType = AuthorType as any;
