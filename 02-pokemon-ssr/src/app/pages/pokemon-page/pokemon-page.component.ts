import { Component, inject, OnInit, signal } from '@angular/core';
import { IPokemonDetailAPIResponse } from '../../pokemons/interfaces/pokemon-detail-api-response';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
})
export default class PokemonPageComponent implements OnInit {

  private pokemonService = inject(PokemonsService);
  private activatedRoute = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<IPokemonDetailAPIResponse | null>(null);

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];

    if (!id) {
      return;
    }

    this.pokemonService.loadPokemon(id).pipe(
      tap(pokemon => {

        this.title.setTitle(` id: ${pokemon.id} - ${pokemon.name}`);

        this.meta.updateTag({
          name: 'description',
          content: `Este es mi pokemon ${pokemon.name}`
        });

        this.meta.updateTag({
          property: 'og:title',
          content: `${pokemon.name}`
        });

        this.meta.updateTag({
          property: 'keywords',
          content: 'Hola, mundo, pokemon'
        });

        this.meta.updateTag({
          property: 'og:image',
          content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        });

      })
    ).subscribe(pokemon => this.pokemon.set(pokemon));

  }

}
