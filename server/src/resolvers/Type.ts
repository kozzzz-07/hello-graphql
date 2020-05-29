import { Pokemon } from '../data/pokemon-data';

export default {
  Pokemon: {
    baseStats: (parent: Pokemon): number =>
      Object.values(parent.stats).reduce((a, b) => a + b),
  },
};
