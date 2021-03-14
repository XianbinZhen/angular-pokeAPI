import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonPage } from '../models/pokemon';
import { PokemonDetail } from '../models/pokemon-detail';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  currentpage: number = 0;
  totalPage: number = 0;
  pokemonPerPage: number = 20;
  allPokemons: Pokemon[] = [];

  constructor(private http:HttpClient) { }

  async getAllPokemon(): Promise<PokemonPage> {
    const pokemonPage:PokemonPage = await this.http.get<PokemonPage>(`https://pokeapi.co/api/v2/pokemon/?offset=${this.currentpage*this.pokemonPerPage}&limit=${this.pokemonPerPage}`).toPromise();
    return pokemonPage;
  };

  async getPokemonByName(name:string): Promise<PokemonDetail> {
    const pokemonDetail: PokemonDetail = await this.http.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${name}`).toPromise();
    return pokemonDetail;
  }

  async getnextPagePokemon(url:string): Promise<PokemonPage> {
    const pokemonPage:PokemonPage = await this.http.get<PokemonPage>(url).toPromise();
    return pokemonPage;
  };

  async getAllPokemonFromDB(): Promise<PokemonPage> {
    const pokemonPage: PokemonPage = await this.http.get<PokemonPage>("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0").toPromise();
    return pokemonPage;
  }

}
