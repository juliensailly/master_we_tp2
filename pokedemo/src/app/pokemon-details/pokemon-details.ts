import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon, PokemonStat } from '../pokemon';
import { PokeAPI } from '../poke-api';

@Component({
  selector: 'app-pokemon-details',
  standalone: false,
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css'
})
export class PokemonDetails implements OnInit, OnChanges {
  @Input() pokemonId: string = '';
  pokemon: Pokemon = new Pokemon();
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private pokeApiService: PokeAPI) {}

  ngOnInit() {
    if (this.pokemonId && this.pokemonId !== '-1') {
      this.loadPokemonDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonId'] && this.pokemonId && this.pokemonId !== '-1') {
      this.loadPokemonDetails();
    }
  }

  loadPokemonDetails() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.pokeApiService.getPokemon(this.pokemonId).subscribe({
      next: (response: any) => {
        this.pokemon = this.mapApiResponseToPokemon(response);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des données du pokémon';
        this.isLoading = false;
        console.error('Erreur API:', error);
      }
    });
  }

  private mapApiResponseToPokemon(apiResponse: any): Pokemon {
    const pokemon = new Pokemon(
      apiResponse.id.toString(),
      apiResponse.name,
      apiResponse.sprites?.front_default || ''
    );

    pokemon.height = apiResponse.height;
    pokemon.weight = apiResponse.weight;
    pokemon.types = apiResponse.types?.map((type: any) => type.type.name) || [];
    pokemon.stats = apiResponse.stats?.map((stat: any) => ({
      name: this.translateStatName(stat.stat.name),
      value: stat.base_stat
    })) || [];

    return pokemon;
  }

  private translateStatName(statName: string): string {
    const translations: { [key: string]: string } = {
      'hp': 'Points de Vie',
      'attack': 'Attaque',
      'defense': 'Défense',
      'special-attack': 'Attaque Spéciale',
      'special-defense': 'Défense Spéciale',
      'speed': 'Vitesse'
    };
    return translations[statName] || statName;
  }
}
