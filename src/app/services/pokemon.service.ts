import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonPage } from '../models/pokemon';
import { PokemonDetail } from '../models/pokemon-detail';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  currentpage: number = 0;
  pokemonPerPage: number = 20;

  constructor(private http:HttpClient) { }

  async getAllPokemon() {
    const pokemonPage:PokemonPage = await this.http.get<PokemonPage>(`https://pokeapi.co/api/v2/pokemon/?offset=${this.currentpage*this.pokemonPerPage}&limit=${this.pokemonPerPage}`).toPromise();
    // let results: Pokemon[] = pokemonPage.results;
    return pokemonPage;
  };

  async getPokemonByName(name:string) {
    const pokemonDetail: PokemonDetail = await this.http.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${name}`).toPromise();
    return pokemonDetail;
  }

  async getnextPagePokemon(url:string) {
    const pokemonPage:PokemonPage = await this.http.get<PokemonPage>(url).toPromise();
    return pokemonPage;
  };

}
