import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
});

export const BookSchema = BookType;
