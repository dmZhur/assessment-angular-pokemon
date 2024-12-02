export interface PokemonType {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
}

export interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}
