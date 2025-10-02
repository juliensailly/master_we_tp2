import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon, PokemonStat } from '../pokemon';
import { PokeAPI } from '../poke-api';
import { PokemonCommunication } from '../pokemon-communication';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  standalone: false,
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css'
})
export class PokemonDetails implements OnInit, OnDestroy {
  pokemon: Pokemon = new Pokemon();
  isLoading: boolean = false;
  errorMessage: string = '';
  currentPokemonId: string = '-1';
  private subscription: Subscription = new Subscription();

  constructor(
    private pokeApiService: PokeAPI,
    private pokemonCommunicationService: PokemonCommunication
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.pokemonCommunicationService.selectedPokemonId$.subscribe(
        (pokemonId: string) => {
          this.currentPokemonId = pokemonId;
          if (pokemonId && pokemonId !== '-1') {
            this.loadPokemonDetails(pokemonId);
          } else {
            this.pokemon = new Pokemon();
            this.errorMessage = '';
            this.isLoading = false;
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadPokemonDetails(pokemonId: string) {
    this.isLoading = true;
    this.errorMessage = '';

    this.pokeApiService.getPokemon(pokemonId).subscribe({
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
