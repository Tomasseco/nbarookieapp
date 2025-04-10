import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Jugador {
  id: number;
  nombre: string;
  apellidos: string;
  altura: string;
  peso: string;
  equipo: string;
  pais: string;
  numero: number;
  posicion: string;
}


@Injectable({
  providedIn: 'root'
})

export class JugadorService {

  private apiUrl = 'https://api.balldontlie.io/v1/players';
  private headers = new HttpHeaders({
    'Authorization': 'ebdb1361-af05-4df2-b862-c333559c8e15'
  });

  constructor(private http: HttpClient) {}

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers }).pipe(
      map(response => response.data.map((item: any) => ({
        id: item.id,
        nombre: item.first_name,
        apellidos: item.last_name,
        altura: item.height ?? 'Desconocido',
        peso: item.weight?.toString() ?? 'Desconocido',
        equipo: item.team?.full_name ?? 'Sin equipo',
        pais: item.country ?? 'Desconocido',
        numero: item.jersey_number ? +item.jersey_number : 0,
        posicion: item.position || 'N/A'
      })))
    );
  }
}
