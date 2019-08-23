import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

import { logger } from '@shared';
import { AuthorDao } from '@daos';

import { AuthorObjectType } from './Author';

const Author = new AuthorDao();

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
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

export const BookObjectType = BookType as any;
