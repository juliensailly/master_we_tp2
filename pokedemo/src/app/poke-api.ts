import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeAPI {
  http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  getPokemons(limit: number = 100) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  }

  getPokemon(id: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  }
}
