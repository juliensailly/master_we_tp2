import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-my-component',
  standalone: false,
  templateUrl: './my-component.html',
  styleUrl: './my-component.css',
})
export class MyComponent {
  filterQuery: string = '';
  selectedPokemonId: string = '-1'

  // Liste fictive de Pokemons
  pokemons = [
    new Pokemon('1', 'Bulbasaur'),
    new Pokemon('2', 'Charmander'),
    new Pokemon('3', 'Squirtle'),
    new Pokemon('4', 'Pikachu'),
    new Pokemon('5', 'Eevee'),
  ];

  displaySelectedPokemon() {
    const selected = this.pokemons.find(p => p.id === this.selectedPokemonId)
    if (selected) {
      console.log(selected.name)
    } else {
      console.log('No Pokemon selected')
    }
  }
}
