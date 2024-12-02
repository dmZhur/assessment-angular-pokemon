import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    FilterContainerComponent,
    RouterModule,
  ],
  providers: [PokemonService],
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss'],
})
export class PokemonTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'types'];
  dataSource: { id: number; name: string; types: string }[] = [];
  totalPokemons = 0;
  pageSize = 10;
  currentPage = 0;
  isLoading = false;
  filterType = '';
  filterName = '';
  filteredDataSource: { id: number; name: string; types: string }[] = [];

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTotalPokemons();
    this.loadPokemons();
  }

  fetchTotalPokemons(): void {
    this.pokemonService.getPokemonList(0, 1).subscribe({
      next: (data: PokemonListResponse) => {
        this.totalPokemons = data.count;
      },
      error: (error) => {
        console.error('Error fetching', error);
      },
    });
  }

  loadPokemons(): void {
    const offset = this.currentPage * this.pageSize;
    this.isLoading = true;
    this.pokemonService
      .getDetailedPokemonList(offset, this.pageSize)
      .subscribe({
        next: (data: Pokemon[]) => {
          this.dataSource = data.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map((type) => type.type.name).join(', '),
          }));
          this.applyFilters();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading data', error);
          this.isLoading = false;
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPokemons();
  }

  onFilterTypeChange(filterType: string): void {
    this.filterType = filterType;
    this.applyFilters();
  }

  onFilterNameChange(filterName: string): void {
    this.filterName = filterName;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredDataSource = this.dataSource.filter((pokemon) => {
      const matchesType = this.filterType
        ? pokemon.types.toLowerCase().includes(this.filterType.toLowerCase())
        : true;
      const matchesName = this.filterName
        ? pokemon.name.toLowerCase().includes(this.filterName.toLowerCase())
        : true;
      return matchesType && matchesName;
    });
  }

  navigateToDetail(pokemonId: number): void {
    this.router.navigate(['/pokemon', pokemonId]);
  }
}
