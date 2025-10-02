import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonCommunication } from '../pokemon-communication';
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

  // Liste de Pokemons
  pokemons = [
    new Pokemon('1', 'Bulbasaur'),
    new Pokemon('2', 'Charmander'),
    new Pokemon('3', 'Squirtle'),
    new Pokemon('4', 'Pikachu'),
    new Pokemon('5', 'Eevee'),
  ];

  constructor(private pokemonCommunicationService: PokemonCommunication) { }

  ngOnInit() {
    this.subscription.add(
      this.pokemonCommunicationService.selectedPokemonId$.subscribe(
        (pokemonId: string) => {
          this.selectedPokemonId = pokemonId;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displaySelectedPokemon() {
    const selected = this.pokemons.find(p => p.id === this.selectedPokemonId)
    if (selected) {
      console.log('Pokemon sélectionné:', selected.name)
    } else {
      console.log('Aucun Pokemon sélectionné')
    }

    this.pokemonCommunicationService.setSelectedPokemonId(this.selectedPokemonId);
  }

  onPokemonSelection() {
    console.log('Pokemon sélectionné - ID:', this.selectedPokemonId);

    this.pokemonCommunicationService.setSelectedPokemonId(this.selectedPokemonId);
  }
}
