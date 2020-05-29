import { readFileSync } from 'fs';

export default JSON.parse(
  readFileSync('./src/data/pokemon_data.json', 'utf-8'),
) as Pokemon[];

export type FilterConditionsKey = keyof FilterConditions;

// memo: sortBy limit
export interface FilterConditions {
  no?: string;
  name?: string;
  types?: string[];
  abilities?: string[];
  hiddenAbilities?: string[];
  search: 'AND' | 'OR';
}

export interface Pokemon {
  no: number;
  name: string;
  form: string;
  isMegaEvolution: boolean;
  evolutions: number[];
  types: string[];
  abilities: string[];
  hiddenAbilities: string[];
  stats: Stats;
}

interface Stats {
  hp: number;
  attack: number;
  defence: number;
  spAttack: number;
  spDefence: number;
  speed: number;
}
