import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [PokemonService],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPokemonDetails(id);
    }
  }

  fetchPokemonDetails(id: string): void {
    this.isLoading = true;
    this.pokemonService
      .getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .subscribe({
        next: (data) => {
          this.pokemon = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching details', err);
          this.isLoading = false;
        },
      });
  }
}
