import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Population } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchCities(query: string): Observable<Population[]> {
    return this.http
      .get<Population[]>(
        `${this.apiUrl}/api/populations/search?cityName=${query}`,
      )
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(() => query.length >= 3),
        map((results) => results.slice(0, 5)),
      );
  }
}
