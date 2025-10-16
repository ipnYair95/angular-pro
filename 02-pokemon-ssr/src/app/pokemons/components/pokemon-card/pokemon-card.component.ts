import { Component, computed, effect, input } from '@angular/core';
import { ISimplePokemon } from '../../interfaces/simple-pokemom';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {

  public pokemon = input.required<ISimplePokemon>()

  public pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`)

  /* logEffect = effect(() => {
    console.log(this.pokemon())
  }) */

 }
