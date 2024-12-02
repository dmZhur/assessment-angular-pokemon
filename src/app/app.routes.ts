import { Routes } from '@angular/router';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: '', component: PokemonTableComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
];
