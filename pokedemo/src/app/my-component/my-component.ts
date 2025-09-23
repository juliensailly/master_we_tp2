import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-my-component',
  standalone: false,
  templateUrl: './my-component.html',
  styleUrl: './my-component.css'
})
export class MyComponent {
  id: string = '';

  // Liste fictive de Pokemons
  pokemons = [
    new Pokemon(1, 'Bulbasaur'),
    new Pokemon(2, 'Charmander'),
    new Pokemon(3, 'Squirtle'),
    new Pokemon(4, 'Pikachu'),
    new Pokemon(5, 'Eevee'),
  ];
}
