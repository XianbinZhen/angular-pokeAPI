import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetail, Type } from 'src/app/models/pokemon-detail';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  pokemonName:string = 'Pokemon not found';
  height:number = 0;
  weight:number = 0;
  pokemonDetail:PokemonDetail = null;
  img:string = '';
  sprites:string[] = [];
  types: Type[] = [];
  constructor(private route:ActivatedRoute, private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.pokemonName = params['name'];
      this.pokemonDetail = await this.pokemonService.getPokemonByName(this.pokemonName);
      this.img = this.pokemonDetail.sprites.front_default;
      this.sprites = Object.values(this.pokemonDetail.sprites);
      this.height = this.pokemonDetail.height;
      this.weight = this.pokemonDetail.weight;
      this.pokemonName = this.pokemonDetail.name;
      console.log(this.pokemonDetail.types);
      this.types = this.pokemonDetail.types;
      
    });
  }

  
}
