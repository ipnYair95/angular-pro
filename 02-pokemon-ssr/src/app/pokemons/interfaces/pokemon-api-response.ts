export interface IPokemonApiResponse {
  count:    number;
  next:     string;
  previous: null;
  results:  IPokemonApiDto[];
}

export interface IPokemonApiDto {
  name: string;
  url:  string;
}
