import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';
import { MyComponent } from '../my-component/my-component';

@Component({
  selector: 'app-display-pokemon',
  standalone: false,
  templateUrl: './display-pokemon.html',
  styleUrl: './display-pokemon.css'
})
export class DisplayPokemon {
  constructor(public pokemon: Pokemon) {}

  
}
