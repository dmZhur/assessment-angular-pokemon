import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(
    offset: number,
    limit: number
  ): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `${this.apiUrl}?offset=${offset}&limit=${limit}`
    );
  }

  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  getDetailedPokemonList(offset: number, limit: number): Observable<Pokemon[]> {
    return this.getPokemonList(offset, limit).pipe(
      map((response: PokemonListResponse) => response.results),
      map((results: { name: string; url: string }[]) =>
        results.map((pokemon) => this.getPokemonDetails(pokemon.url))
      ),
      switchMap((detailObservables: Observable<Pokemon>[]) =>
        forkJoin(detailObservables)
      )
    );
  }
}
