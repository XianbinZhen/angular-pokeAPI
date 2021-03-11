import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, PokemonPage } from 'src/app/models/pokemon';
import { PokemonDetail } from 'src/app/models/pokemon-detail';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  searchName: string = '';
  pokemonPage: PokemonPage = null;
  pokemons: Pokemon[] = [];
  pokemonCount: number = 0; 
  prevPage:string = '';
  nextPage:string = '';
  pokemonDetail:PokemonDetail = null;
  pageNumber: number = 0;
  constructor(private pokemonService:PokemonService, private http:HttpClient,
    private route: ActivatedRoute, private router: Router) {

  }

  async ngOnInit() {
    this.pokemonPage = await this.pokemonService.getAllPokemon();
    this.pokemons = this.pokemonPage.results;
    this.pokemonCount = this.pokemonPage.count;
    this.prevPage = this.pokemonPage.previous;
    this.nextPage = this.pokemonPage.next;
    this.pokemons.forEach( async(pokemon)=> {
      this.pokemonDetail = await this.pokemonService.getPokemonByName(pokemon.name);
      const img = this.pokemonDetail.sprites.front_default;
      pokemon.img = img;
    });
    this.pageNumber = this.pokemonService.currentpage;


  }

  async getPrevPage() {
    this.pokemonPage = await this.pokemonService.getnextPagePokemon(this.prevPage);
    this.pokemons = this.pokemonPage.results;
    this.pokemonCount = this.pokemonPage.count;
    this.prevPage = this.pokemonPage.previous;
    this.nextPage = this.pokemonPage.next;
    this.pokemons.forEach( async(pokemon)=> {
      this.pokemonDetail = await this.pokemonService.getPokemonByName(pokemon.name);
      const img = this.pokemonDetail.sprites.front_default;
      pokemon.img = img;
    });
    this.pageNumber--;
    this.pokemonService.currentpage = this.pageNumber;
  }

  async getNextPage(num:number) {
    this.pageNumber += num;
    this.pokemonService.currentpage = this.pageNumber;
    this.pokemonPage = await this.pokemonService.getAllPokemon();
    this.pokemons = this.pokemonPage.results;
    this.pokemonCount = this.pokemonPage.count;
    this.prevPage = this.pokemonPage.previous;
    this.nextPage = this.pokemonPage.next;
    this.pokemons.forEach( async(pokemon)=> {
      this.pokemonDetail = await this.pokemonService.getPokemonByName(pokemon.name);
      const img = this.pokemonDetail.sprites.front_default;
      pokemon.img = img;
    });
    
  }

  searchPokemon() {
    if(this.searchName == '') {
      const randomNum = Math.floor(Math.random()*896 + 1);
      this.router.navigate(['detail', randomNum]);
    } else 
      this.router.navigate(['detail', this.searchName]);
  }

}
