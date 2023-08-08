import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../model/reserva';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Reserva[]>(this.baseUrl);
  }

  save(record: Reserva) {
    return this.http.post<Reserva>(this.baseUrl, record);
  }

  findById(id: number) {
    return this.http.get<Reserva>(`${this.baseUrl}/${id}`);
  }

  editById(id: number, reserva: Reserva) {
    return this.http.put<Reserva>(`${this.baseUrl}/${id}`, reserva);
  }

  deleteById(id: number) {
    return this.http.delete<Reserva>(`${this.baseUrl}/${id}/cancelar`)
  }
}
