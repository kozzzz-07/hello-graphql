import pokemonData, {
  FilterConditions,
  FilterConditionsKey,
} from '../data/pokemon-data';

export default {
  hello: () => 'Hello world!',
  allPokemon: (parent: unknown, { search, ...args }: FilterConditions) => {
    const keys = Object.keys(args) as FilterConditionsKey[];

    const filteredPokemonData = pokemonData.filter((pokemon) =>
      keys.every((key) => {
        if (key === 'no') {
          // noはID型のため文字列で送られてくる numberで定義してもいいけどなあ
          return pokemon[key] === +args[key];
        }

        if (
          key === 'types' ||
          key === 'abilities' ||
          key === 'hiddenAbilities'
        ) {
          return search === 'AND'
            ? args[key].every((type) => pokemon[key].includes(type))
            : pokemon[key].every((type) => args[key].includes(type));
        }

        return pokemon[key] === args[key];
      }),
    );
    return filteredPokemonData;
  },
};
