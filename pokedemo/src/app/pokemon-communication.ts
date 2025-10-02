import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonCommunication {
  private selectedPokemonIdSubject = new BehaviorSubject<string>('-1');

  private searchedPokemonNameSubject = new BehaviorSubject<string>('');

  public selectedPokemonId$: Observable<string> = this.selectedPokemonIdSubject.asObservable();
  public searchedPokemonName$: Observable<string> = this.searchedPokemonNameSubject.asObservable();

  constructor() { }

  setSelectedPokemonId(pokemonId: string): void {
    this.selectedPokemonIdSubject.next(pokemonId);
    console.log('Service: Pokemon ID mis à jour:', pokemonId);
  }

  setSearchedPokemonName(pokemonName: string): void {
    this.searchedPokemonNameSubject.next(pokemonName);
    console.log('Service: Pokemon name recherché:', pokemonName);
  }

  getCurrentPokemonId(): string {
    return this.selectedPokemonIdSubject.value;
  }

  getCurrentSearchedName(): string {
    return this.searchedPokemonNameSubject.value;
  }

  resetSelection(): void {
    this.selectedPokemonIdSubject.next('-1');
    this.searchedPokemonNameSubject.next('');
    console.log('Service: Sélection réinitialisée');
  }
}
