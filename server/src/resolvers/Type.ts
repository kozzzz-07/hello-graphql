import { Pokemon } from '../data/pokemon-data';
import { GraphQLScalarType } from 'graphql';

export default {
  Pokemon: {
    baseStats: (parent: Pokemon): number =>
      Object.values(parent.stats).reduce((a, b) => a + b),
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'A valid date value.',
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),
};
