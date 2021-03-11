import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemonName:string = 'Pikachu';
  @Input() pokemonUrl:string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.pokemonId = params['pokemonId'];
    // })
  }

  onImageError(event): void {
    event.target.src='../../../assets/img/running.gif';
  }

  openDetail(): void {
    this.router.navigate(['detail', this.pokemonName]);
  }

}
