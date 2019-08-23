import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
});

export const BookObjectType = BookType;
