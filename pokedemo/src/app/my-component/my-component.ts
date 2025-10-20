import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonCommunication } from '../pokemon-communication';
import { PokeAPI } from '../poke-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-component',
  standalone: false,
  templateUrl: './my-component.html',
  styleUrl: './my-component.css',
})
export class MyComponent implements OnInit, OnDestroy {
  filterQuery: string = '';
  selectedPokemonId: string = '-1';
  private subscription: Subscription = new Subscription();
  isLoadingPokemons: boolean = true;
  errorLoadingPokemons: string = '';

  pokemons: Pokemon[] = [];

  constructor(
    private pokemonCommunicationService: PokemonCommunication,
    private pokeApiService: PokeAPI
  ) { }

  ngOnInit() {
    this.loadPokemonsList();

    this.subscription.add(
      this.pokemonCommunicationService.selectedPokemonId$.subscribe(
        (pokemonId: string) => {
          this.selectedPokemonId = pokemonId;
        }
      )
    );
  }

  loadPokemonsList() {
    this.isLoadingPokemons = true;
    this.errorLoadingPokemons = '';

    this.pokeApiService.getPokemons(151).subscribe({
      next: (response: any) => {
        this.pokemons = response.results.map((pokemon: any, index: number) => {
          const pokemonId = pokemon.url.split('/').filter((part: string) => part).pop();
          return new Pokemon(pokemonId, this.capitalizeFirstLetter(pokemon.name));
        });
        this.isLoadingPokemons = false;
      },
      error: (error) => {
        this.errorLoadingPokemons = 'Erreur lors du chargement de la liste des Pokémons';
        this.isLoadingPokemons = false;
        console.error('Erreur lors du chargement des Pokémons:', error);
      }
    });
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displaySelectedPokemon() {
    const selected = this.pokemons.find(p => p.id === this.selectedPokemonId);
    if (selected) {
      console.log('Pokemon sélectionné:', selected.name, '(ID:', selected.id, ')');
    } else {
      console.log('Aucun Pokemon sélectionné');
    }

    this.pokemonCommunicationService.setSelectedPokemonId(this.selectedPokemonId);
  }

  onPokemonSelection() {
    console.log('Pokemon sélectionné - ID:', this.selectedPokemonId);

    this.pokemonCommunicationService.setSelectedPokemonId(this.selectedPokemonId);
  }
}
