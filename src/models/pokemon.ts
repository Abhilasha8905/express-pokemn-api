import FavouriteEntity from "./favourite-entity";

export type ListPokemonQuery = {
  search: string;
  offset: number;
  limit: number;
  show_favourites_only: boolean;
};

export type PokemonList = { results: { name: string }[] };

export class Pokemon extends FavouriteEntity {
  name: string;
  id: string;
  front_image: string;
  back_image: string;
  weight: string;
  height: string;
  hp: string;
  attack: string;
  defence: string;
  special_attack: string;
  special_defence: string;
  speed: string;
  type: string[];
  is_favourite: boolean;

  entity_type: string = "pokemon";

  constructor(
    name: string,
    id: string,
    front_image: string,
    back_image: string,
    weight: string,
    height: string,
    hp: string,
    attack: string,
    defence: string,
    special_attack: string,
    special_defence: string,
    speed: string,
    type: string[],
    is_favourite: boolean
  ) {
    super();
    this.name = name;
    this.id = id;
    this.front_image = front_image;
    this.back_image = back_image;
    this.weight = weight;
    this.height = height;
    this.hp = hp;
    this.attack = attack;
    this.defence = defence;
    this.special_attack = special_attack;
    this.special_defence = special_defence;
    this.speed = speed;
    this.type = type;
    this.is_favourite = is_favourite;
  }

  static parseApiDataToPokemon(
    operation_id: string,
    api_data: any,
    favourite_data: any
  ): Pokemon {
    return new Pokemon(
      api_data.name,
      api_data.id,
      api_data.sprites["front_default"],
      api_data.sprites["back_default"],
      api_data.weight,
      api_data.height,
      api_data.stats[0]["base_stat"],
      api_data.stats[1]["base_stat"],
      api_data.stats[2]["base_stat"],
      api_data.stats[3]["base_stat"],
      api_data.stats[4]["base_stat"],
      api_data.stats[5]["base_stat"],
      api_data.types.map((type: any) => type.type.name),
      favourite_data.some(
        (favourite: { entityId: any }) =>
          favourite.entityId === String(api_data.id)
      )
    );
  }
}
