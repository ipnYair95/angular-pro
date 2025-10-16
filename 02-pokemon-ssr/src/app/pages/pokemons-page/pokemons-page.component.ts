import { ApplicationRef, Component, effect, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ISimplePokemon } from '../../pokemons/interfaces/simple-pokemom';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
})
export default class PokemonsPageComponent {

  private pokemonsService = inject(PokemonsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public pokemons = signal<ISimplePokemon[]>([]);

  public currentPage = toSignal<number>( this.activatedRoute.params.pipe(
    map(params => params['page'] ?? '1'),
    map(page => isNaN(+page) ? 1 : +page),
    map(page => Math.max(1, page))
  ));

  public loadOnPageChanged = effect(() => {

    this.loadPokemons( this.currentPage() );

  });


  public loadPokemons(page: number = 0) {

    const pageToLoad = this.currentPage()!;

    this.pokemonsService
    .loadPage(pageToLoad).pipe(
      tap(() => this.title.setTitle(`Listado de pokemons - ${pageToLoad}`))
    ).subscribe(pokemons => {

      this.pokemons.set(pokemons);

    });

  }


}
