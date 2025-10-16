import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ISimplePokemon } from '../interfaces/simple-pokemom';
import { IPokemonApiResponse } from '../interfaces/pokemon-api-response';
import { IPokemonDetailAPIResponse } from '../interfaces/pokemon-detail-api-response';


@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private httpClient = inject(HttpClient);

  public loadPage(page: number): Observable<ISimplePokemon[]> {

    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.httpClient.get<IPokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`).pipe(
      map(response => response.results.map(pokemon => ({
        id: pokemon.url.split("/").at(-2)! ?? '',
        name: pokemon.name
      })))
    )

  }

  public loadPokemon(id: string) : Observable<IPokemonDetailAPIResponse> {

    return this.httpClient.get<IPokemonDetailAPIResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`);

  }

}
