  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent },
  { path: 'detail/:name', component: PokemonDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }