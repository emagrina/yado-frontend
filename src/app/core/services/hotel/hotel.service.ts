import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHotelsByCountry(
    countryId: number,
    page: number,
    pageSize: number,
  ): Observable<any> {
    const url = `${this.apiUrl}/api/hotels/population/${countryId}?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  getHotels(): Observable<any> {
    return this.http.get('assets/data/hotels.json');
  }

  getHotelById(hotelId: string): Observable<Hotel> {
    const url = `${this.apiUrl}/api/hotels/${hotelId}`;
    return this.http.get<Hotel>(url);
  }
}
