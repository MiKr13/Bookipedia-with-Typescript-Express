import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';

import { logger } from '@shared';
import { BookDao, AuthorDao } from '@daos';

import { BookObjectType } from './Book';

const Book = new BookDao();
const Author = new AuthorDao();

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        favouriteGenre: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookObjectType),
            async resolve(parent: any, args: any) {
                try {
                    return await Book.findAllByAuthorID(parent.id);
                } catch (err) {
                    logger.error(err.message, err);
                }
            },
        },
    }),
});

const addAuthorMutation = {
    type: AuthorType,
    args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        favouriteGenre: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        try {
            return await Author.add({
                name: args.name,
                age: args.age,
                favouriteGenre: args.favouriteGenre,
            });
        } catch (err) {
            logger.error(err.message, err);
        }
    },
};

export const AuthorObjectType = AuthorType as any;
export const addAuthor = addAuthorMutation as any;
