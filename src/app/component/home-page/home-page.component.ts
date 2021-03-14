import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon, PokemonPage } from 'src/app/models/pokemon';
import { PokemonDetail } from 'src/app/models/pokemon-detail';
import { PokemonService } from 'src/app/services/pokemon.service';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  myControl: FormControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  pokemonPage: PokemonPage = null;
  totalPage: number = 0;
  pokemons: Pokemon[] = [];
  allPokemons: Pokemon[] = [];
  pokemonCount: number = 0; 
  prevPage:string = '';
  nextPage:string = '';
  pokemonDetail:PokemonDetail = null;
  pageNumber: number = 0;
  constructor(private pokemonService:PokemonService, private http:HttpClient,
    private route: ActivatedRoute, private router: Router) {

  }

  async ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    if(this.pokemonService.allPokemons.length < 1 ) {
      this.pokemonPage = await this.pokemonService.getAllPokemonFromDB();
      this.allPokemons = this.pokemonPage.results;
      this.pokemonService.allPokemons = this.allPokemons;
      this.pokemonCount = this.pokemonPage.count;
      this.pokemonService.totalPage = Math.ceil(this.pokemonCount / this.pokemonService.pokemonPerPage);
      // console.log(this.pokemonService.allPokemons);
    }
    this.pokemonPage = await this.pokemonService.getAllPokemon();
    this.pokemons = this.pokemonPage.results;
    this.prevPage = this.pokemonPage.previous;
    this.nextPage = this.pokemonPage.next;
    this.pokemons.forEach( async(pokemon)=> {
      this.pokemonDetail = await this.pokemonService.getPokemonByName(pokemon.name);
      const img = this.pokemonDetail.sprites.other['official-artwork'].front_default || this.pokemonDetail.sprites.front_default;
      pokemon.img = img;
    });

    this.pageNumber = this.pokemonService.currentpage;
    this.allPokemons = this.pokemonService.allPokemons;
    this.totalPage = this.pokemonService.totalPage;
    this.options = this.allPokemons.map( e => {
      return e.name;
    });

  }

  async getNextPage(num:number) {
    this.pageNumber += num;
    if (this.pageNumber >=55)
      this.pageNumber = 55;
    if (this.pageNumber <= 0)
      this.pageNumber = 0;
    this.pokemonService.currentpage = this.pageNumber;
    this.pokemonPage = await this.pokemonService.getAllPokemon();
    this.pokemons = this.pokemonPage.results;
    this.pokemonCount = this.pokemonPage.count;
    this.prevPage = this.pokemonPage.previous;
    this.nextPage = this.pokemonPage.next;
    this.pokemons.forEach( async(pokemon)=> {
      this.pokemonDetail = await this.pokemonService.getPokemonByName(pokemon.name);
      const img = this.pokemonDetail.sprites.other['official-artwork'].front_default || this.pokemonDetail.sprites.front_default;
      pokemon.img = img;
    });
  }

  searchPokemon(): void {
    if(this.myControl.value == null) {
      const randomNum = Math.floor(Math.random()*this.pokemonService.allPokemons.length + 1);
      this.router.navigate(['detail', this.pokemonService.allPokemons[randomNum].name]);
    } else 
      this.router.navigate(['detail', this.myControl.value]);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
